"use client";

import { ChangeEvent, useEffect, useState } from "react";

type OutputFormat = "image/jpeg" | "image/png" | "image/webp";

export default function ImageCompressorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [compressedUrl, setCompressedUrl] = useState("");
  const [compressedSize, setCompressedSize] = useState(0);
  const [quality, setQuality] = useState(70);
  const [format, setFormat] = useState<OutputFormat>("image/jpeg");
  const [error, setError] = useState("");
  const [isCompressing, setIsCompressing] = useState(false);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
      if (compressedUrl) URL.revokeObjectURL(compressedUrl);
    };
  }, [preview, compressedUrl]);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    setError("");
    setCompressedSize(0);

    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (selectedFile.size > 20 * 1024 * 1024) {
      setError("Please choose an image smaller than 20 MB.");
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    if (compressedUrl) {
      URL.revokeObjectURL(compressedUrl);
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setCompressedUrl("");
  }

  function compressImage() {
    if (!file) {
      setError("Please select an image first.");
      return;
    }

    setError("");
    setIsCompressing(true);

    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        setError("Your browser does not support image processing.");
        setIsCompressing(false);
        return;
      }

      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      context.drawImage(image, 0, 0);

      const mimeType =
        file.type === "image/png" && format === "image/png"
          ? "image/png"
          : format;

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setError("Unable to compress this image.");
            setIsCompressing(false);
            return;
          }

          if (compressedUrl) {
            URL.revokeObjectURL(compressedUrl);
          }

          const url = URL.createObjectURL(blob);

          setCompressedUrl(url);
          setCompressedSize(blob.size);
          setIsCompressing(false);
        },
        mimeType,
        quality / 100
      );
    };

    image.onerror = () => {
      setError("Unable to read the selected image.");
      setIsCompressing(false);
    };

    image.src = URL.createObjectURL(file);
  }

  function clearAll() {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    if (compressedUrl) {
      URL.revokeObjectURL(compressedUrl);
    }

    setFile(null);
    setPreview("");
    setCompressedUrl("");
    setCompressedSize(0);
    setError("");
    setQuality(70);
    setFormat("image/jpeg");
  }

  function formatBytes(bytes: number) {
    if (bytes === 0) return "0 Bytes";

    const units = ["Bytes", "KB", "MB", "GB"];
    const index = Math.floor(Math.log(bytes) / Math.log(1024));

    return `${(bytes / Math.pow(1024, index)).toFixed(2)} ${
      units[index]
    }`;
  }

  const reduction =
    file && compressedSize
      ? Math.max(
          0,
          ((file.size - compressedSize) / file.size) * 100
        )
      : 0;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="mx-auto max-w-6xl px-6 py-14 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">
            Image Compressor
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Compress JPG, PNG and WebP images directly in your
            browser. Reduce image file size quickly and easily.
          </p>
        </div>
      </section>

      {/* Tool */}
      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <label
            htmlFor="image-upload"
            className="mb-3 block text-lg font-semibold"
          >
            Select an Image
          </label>

          <input
            id="image-upload"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="block w-full rounded-xl border p-3 text-sm"
          />

          {error && (
            <div className="mt-5 rounded-lg bg-red-100 p-4 text-red-700">
              {error}
            </div>
          )}

          {file && (
            <>
              {/* Settings */}
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="quality"
                    className="mb-2 block font-semibold"
                  >
                    Quality: {quality}%
                  </label>

                  <input
                    id="quality"
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(event) =>
                      setQuality(Number(event.target.value))
                    }
                    className="w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="format"
                    className="mb-2 block font-semibold"
                  >
                    Output Format
                  </label>

                  <select
                    id="format"
                    value={format}
                    onChange={(event) =>
                      setFormat(
                        event.target.value as OutputFormat
                      )
                    }
                    className="w-full rounded-xl border p-3"
                  >
                    <option value="image/jpeg">JPG</option>
                    <option value="image/png">PNG</option>
                    <option value="image/webp">WebP</option>
                  </select>
                </div>
              </div>

              {/* File information */}
              <div className="mt-6 rounded-xl bg-gray-50 p-4">
                <div className="grid gap-3 text-sm md:grid-cols-3">
                  <div>
                    <span className="font-semibold">
                      File:
                    </span>{" "}
                    {file.name}
                  </div>

                  <div>
                    <span className="font-semibold">
                      Original:
                    </span>{" "}
                    {formatBytes(file.size)}
                  </div>

                  <div>
                    <span className="font-semibold">
                      Type:
                    </span>{" "}
                    {file.type}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={compressImage}
                  disabled={isCompressing}
                  className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  {isCompressing
                    ? "Compressing..."
                    : "📉 Compress Image"}
                </button>

                <button
                  onClick={clearAll}
                  className="rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
                >
                  🗑️ Clear
                </button>
              </div>

              {/* Preview */}
              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div>
                  <h2 className="mb-3 text-xl font-bold">
                    Original Image
                  </h2>

                  <div className="overflow-hidden rounded-xl border bg-gray-50 p-3">
                    <img
                      src={preview}
                      alt="Original image preview"
                      className="max-h-96 w-full object-contain"
                    />
                  </div>

                  <p className="mt-2 text-sm text-gray-500">
                    {formatBytes(file.size)}
                  </p>
                </div>

                <div>
                  <h2 className="mb-3 text-xl font-bold">
                    Compressed Image
                  </h2>

                  <div className="flex min-h-64 items-center justify-center overflow-hidden rounded-xl border bg-gray-50 p-3">
                    {compressedUrl ? (
                      <img
                        src={compressedUrl}
                        alt="Compressed image preview"
                        className="max-h-96 w-full object-contain"
                      />
                    ) : (
                      <p className="text-gray-400">
                        Compress the image to see the result.
                      </p>
                    )}
                  </div>

                  {compressedSize > 0 && (
                    <>
                      <p className="mt-2 text-sm text-gray-500">
                        {formatBytes(compressedSize)}
                      </p>

                      <p className="mt-1 font-semibold text-green-600">
                        Reduced by {reduction.toFixed(1)}%
                      </p>

                      <a
                        href={compressedUrl}
                        download={`compressed-image.${
                          format === "image/png"
                            ? "png"
                            : format === "image/webp"
                            ? "webp"
                            : "jpg"
                        }`}
                        className="mt-4 inline-block rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
                      >
                        ⬇️ Download Image
                      </a>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* SEO Content */}
      <section className="mx-auto max-w-5xl px-6 pb-12">
        <div className="rounded-2xl bg-white p-8 shadow">
          <h2 className="text-2xl font-bold">
            What is an Image Compressor?
          </h2>

          <p className="mt-4 leading-7 text-gray-700">
            An image compressor reduces the file size of an
            image while attempting to preserve its visual
            quality. Smaller images can load faster and use
            less storage and bandwidth.
          </p>

          <h2 className="mt-8 text-2xl font-bold">
            Supported Image Formats
          </h2>

          <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
            <li>JPEG / JPG</li>
            <li>PNG</li>
            <li>WebP</li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold">
            Is my image uploaded?
          </h2>

          <p className="mt-4 leading-7 text-gray-700">
            No server upload is required for compression.
            Processing happens directly in your web browser
            using the HTML Canvas API.
          </p>

          <h2 className="mt-8 text-2xl font-bold">
            How to compress an image
          </h2>

          <ol className="mt-4 list-decimal space-y-2 pl-6 text-gray-700">
            <li>Select a JPG, PNG or WebP image.</li>
            <li>Choose the compression quality.</li>
            <li>Select the output format.</li>
            <li>Click Compress Image.</li>
            <li>Download the compressed image.</li>
          </ol>
        </div>
      </section>
    </main>
  );
}