"use client";

import { ChangeEvent, useEffect, useState } from "react";

type OutputFormat = "image/png" | "image/jpeg" | "image/webp";

const formatLabels: Record<OutputFormat, string> = {
  "image/png": "PNG",
  "image/jpeg": "JPG",
  "image/webp": "WebP",
};

export default function ImageConverterPage() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [convertedUrl, setConvertedUrl] = useState("");
  const [outputFormat, setOutputFormat] =
    useState<OutputFormat>("image/png");
  const [quality, setQuality] = useState(90);
  const [converting, setConverting] = useState(false);
  const [error, setError] = useState("");
  const [originalDimensions, setOriginalDimensions] =
    useState({ width: 0, height: 0 });

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }

      if (convertedUrl) {
        URL.revokeObjectURL(convertedUrl);
      }
    };
  }, [imageUrl, convertedUrl]);

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    setError("");
    setConvertedUrl("");

    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (selectedFile.size > 20 * 1024 * 1024) {
      setError("Please select an image smaller than 20 MB.");
      return;
    }

    const newUrl = URL.createObjectURL(selectedFile);
    const image = new Image();

    image.onload = () => {
      setFile(selectedFile);
      setImageUrl(newUrl);

      setOriginalDimensions({
        width: image.naturalWidth,
        height: image.naturalHeight,
      });
    };

    image.onerror = () => {
      URL.revokeObjectURL(newUrl);
      setError("Unable to read this image.");
    };

    image.src = newUrl;
  }

  function convertImage() {
    if (!file || !imageUrl) {
      setError("Please select an image first.");
      return;
    }

    setError("");
    setConverting(true);

    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");

      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      const context = canvas.getContext("2d");

      if (!context) {
        setError(
          "Your browser does not support image conversion."
        );
        setConverting(false);
        return;
      }

      /*
       * JPG does not support transparency.
       * Use a white background when converting to JPG.
       */
      if (outputFormat === "image/jpeg") {
        context.fillStyle = "#ffffff";
        context.fillRect(
          0,
          0,
          canvas.width,
          canvas.height
        );
      }

      context.drawImage(
        image,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const qualityValue =
        outputFormat === "image/png"
          ? undefined
          : quality / 100;

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setError("Unable to convert this image.");
            setConverting(false);
            return;
          }

          if (convertedUrl) {
            URL.revokeObjectURL(convertedUrl);
          }

          const url = URL.createObjectURL(blob);

          setConvertedUrl(url);
          setConverting(false);
        },
        outputFormat,
        qualityValue
      );
    };

    image.onerror = () => {
      setError("Unable to process the image.");
      setConverting(false);
    };

    image.src = imageUrl;
  }

  function clearAll() {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }

    if (convertedUrl) {
      URL.revokeObjectURL(convertedUrl);
    }

    setFile(null);
    setImageUrl("");
    setConvertedUrl("");
    setError("");
    setConverting(false);

    setOriginalDimensions({
      width: 0,
      height: 0,
    });
  }

  function getExtension() {
    if (outputFormat === "image/png") {
      return "png";
    }

    if (outputFormat === "image/jpeg") {
      return "jpg";
    }

    return "webp";
  }

  function getOutputName() {
    if (!file) {
      return `converted-image.${getExtension()}`;
    }

    const originalName = file.name.replace(
      /\.[^/.]+$/,
      ""
    );

    return `${originalName}-converted.${getExtension()}`;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="mx-auto max-w-6xl px-6 py-14 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">
            Image Converter
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Convert JPG, PNG and WebP images online for free.
            Choose your preferred format, adjust quality and
            download your converted image instantly.
          </p>
        </div>
      </section>

      {/* Main Tool */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-bold">
            Convert Your Image
          </h2>

          <p className="mt-2 text-gray-600">
            Select an image from your computer to get
            started.
          </p>

          {/* Upload */}
          <div className="mt-6">
            <label
              htmlFor="image-upload"
              className="mb-3 block font-semibold"
            >
              Select Image
            </label>

            <input
              id="image-upload"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="block w-full rounded-xl border p-3 text-sm"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-xl bg-red-100 p-4 text-red-700">
              {error}
            </div>
          )}

          {file && imageUrl && (
            <>
              {/* File Info */}
              <div className="mt-6 rounded-xl bg-gray-50 p-5">
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <p className="text-sm text-gray-500">
                      File
                    </p>

                    <p className="break-all font-semibold">
                      {file.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Dimensions
                    </p>

                    <p className="font-semibold">
                      {originalDimensions.width} ×{" "}
                      {originalDimensions.height}px
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      File Size
                    </p>

                    <p className="font-semibold">
                      {(file.size / 1024 / 1024).toFixed(
                        2
                      )}{" "}
                      MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div className="mt-8 rounded-2xl border p-6">
                <h3 className="text-xl font-bold">
                  Conversion Settings
                </h3>

                {/* Format */}
                <div className="mt-5">
                  <label
                    htmlFor="output-format"
                    className="mb-2 block font-semibold"
                  >
                    Convert To
                  </label>

                  <select
                    id="output-format"
                    value={outputFormat}
                    onChange={(event) => {
                      setOutputFormat(
                        event.target
                          .value as OutputFormat
                      );
                      setConvertedUrl("");
                    }}
                    className="w-full rounded-xl border p-3 outline-none focus:border-blue-500 md:max-w-md"
                  >
                    <option value="image/png">
                      PNG
                    </option>

                    <option value="image/jpeg">
                      JPG
                    </option>

                    <option value="image/webp">
                      WebP
                    </option>
                  </select>
                </div>

                {/* Quality */}
                {outputFormat !== "image/png" && (
                  <div className="mt-6 md:max-w-md">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="quality"
                        className="font-semibold"
                      >
                        Quality
                      </label>

                      <span className="font-bold text-blue-600">
                        {quality}%
                      </span>
                    </div>

                    <input
                      id="quality"
                      type="range"
                      min="10"
                      max="100"
                      value={quality}
                      onChange={(event) =>
                        setQuality(
                          Number(event.target.value)
                        )
                      }
                      className="mt-3 w-full"
                    />

                    <div className="mt-1 flex justify-between text-xs text-gray-500">
                      <span>Smaller file</span>
                      <span>Higher quality</span>
                    </div>
                  </div>
                )}

                {/* Convert */}
                <div className="mt-7 flex flex-wrap gap-3">
                  <button
                    onClick={convertImage}
                    disabled={converting}
                    className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                  >
                    {converting
                      ? "Converting..."
                      : `🔄 Convert to ${
                          formatLabels[outputFormat]
                        }`}
                  </button>

                  <button
                    onClick={clearAll}
                    className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
                  >
                    🗑️ Clear
                  </button>
                </div>
              </div>

              {/* Preview */}
              <div className="mt-10 grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-xl font-bold">
                    Original Image
                  </h3>

                  <div className="flex min-h-72 items-center justify-center overflow-hidden rounded-2xl border bg-gray-50 p-4">
                    <img
                      src={imageUrl}
                      alt={`Original image: ${file.name}`}
                      className="max-h-96 max-w-full object-contain"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-xl font-bold">
                    Converted Image
                  </h3>

                  <div className="flex min-h-72 items-center justify-center overflow-hidden rounded-2xl border bg-gray-50 p-4">
                    {convertedUrl ? (
                      <img
                        src={convertedUrl}
                        alt={`Converted ${formatLabels[outputFormat]} image`}
                        className="max-h-96 max-w-full object-contain"
                      />
                    ) : (
                      <p className="text-center text-gray-400">
                        Your converted image will appear
                        here.
                      </p>
                    )}
                  </div>

                  {convertedUrl && (
                    <a
                      href={convertedUrl}
                      download={getOutputName()}
                      className="mt-4 inline-block rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                    >
                      ⬇️ Download{" "}
                      {formatLabels[outputFormat]}
                    </a>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* SEO Content */}
      <section className="mx-auto max-w-6xl px-6 pb-12">
        <div className="rounded-2xl bg-white p-8 shadow">
          <h2 className="text-2xl font-bold">
            Free Online Image Converter
          </h2>

          <p className="mt-4 leading-7 text-gray-700">
            ToolForge Image Converter makes it easy to
            convert images between popular formats. Convert
            JPG, PNG and WebP files without installing
            additional software.
          </p>

          <h2 className="mt-8 text-2xl font-bold">
            Supported Image Formats
          </h2>

          <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
            <li>
              <strong>JPG / JPEG:</strong> Great for
              photographs and smaller file sizes.
            </li>

            <li>
              <strong>PNG:</strong> Ideal for graphics and
              images requiring transparency.
            </li>

            <li>
              <strong>WebP:</strong> A modern image format
              designed for efficient web performance.
            </li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold">
            How to Convert an Image
          </h2>

          <ol className="mt-4 list-decimal space-y-2 pl-6 text-gray-700">
            <li>Select a JPG, PNG or WebP image.</li>
            <li>Choose the output format.</li>
            <li>Adjust quality when available.</li>
            <li>Click the Convert button.</li>
            <li>Preview your converted image.</li>
            <li>Download the converted file.</li>
          </ol>

          <h2 className="mt-8 text-2xl font-bold">
            Is My Image Uploaded?
          </h2>

          <p className="mt-4 leading-7 text-gray-700">
            No. Image conversion is performed directly in
            your web browser using the Canvas API. Your image
            does not need to be uploaded to a server.
          </p>

          <h2 className="mt-8 text-2xl font-bold">
            Why Convert Images?
          </h2>

          <p className="mt-4 leading-7 text-gray-700">
            Different image formats are useful for different
            situations. JPG can provide smaller photographic
            files, PNG supports transparency, and WebP can
            provide efficient images for websites.
          </p>

          <h2 className="mt-8 text-2xl font-bold">
            Free Image Conversion
          </h2>

          <p className="mt-4 leading-7 text-gray-700">
            ToolForge Image Converter is free to use and
            works directly in modern web browsers. No
            software installation is required.
          </p>
        </div>
      </section>
    </main>
  );
}