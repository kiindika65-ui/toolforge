"use client";

import { ChangeEvent, useEffect, useState } from "react";

type OutputFormat = "image/jpeg" | "image/png" | "image/webp";

export default function ImageResizerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [resizedUrl, setResizedUrl] = useState("");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [lockRatio, setLockRatio] = useState(true);
  const [format, setFormat] = useState<OutputFormat>("image/jpeg");
  const [error, setError] = useState("");
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
      if (resizedUrl) URL.revokeObjectURL(resizedUrl);
    };
  }, [preview, resizedUrl]);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    setError("");

    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (selectedFile.size > 20 * 1024 * 1024) {
      setError("Please choose an image smaller than 20 MB.");
      return;
    }

    const imageUrl = URL.createObjectURL(selectedFile);
    const image = new Image();

    image.onload = () => {
      if (preview) URL.revokeObjectURL(preview);
      if (resizedUrl) URL.revokeObjectURL(resizedUrl);

      setFile(selectedFile);
      setPreview(imageUrl);
      setResizedUrl("");

      setOriginalWidth(image.naturalWidth);
      setOriginalHeight(image.naturalHeight);

      setWidth(image.naturalWidth);
      setHeight(image.naturalHeight);
    };

    image.onerror = () => {
      URL.revokeObjectURL(imageUrl);
      setError("Unable to read the selected image.");
    };

    image.src = imageUrl;
  }

  function handleWidthChange(value: number) {
    setWidth(value);

    if (lockRatio && originalWidth > 0) {
      const newHeight = Math.round(
        (value / originalWidth) * originalHeight
      );

      setHeight(newHeight);
    }
  }

  function handleHeightChange(value: number) {
    setHeight(value);

    if (lockRatio && originalHeight > 0) {
      const newWidth = Math.round(
        (value / originalHeight) * originalWidth
      );

      setWidth(newWidth);
    }
  }

  function resizeImage() {
    if (!file || width <= 0 || height <= 0) {
      setError("Please select an image and enter valid dimensions.");
      return;
    }

    setError("");
    setIsResizing(true);

    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        setError("Your browser does not support image processing.");
        setIsResizing(false);
        return;
      }

      canvas.width = width;
      canvas.height = height;

      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";

      context.drawImage(
        image,
        0,
        0,
        width,
        height
      );

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setError("Unable to resize the image.");
            setIsResizing(false);
            return;
          }

          if (resizedUrl) {
            URL.revokeObjectURL(resizedUrl);
          }

          setResizedUrl(URL.createObjectURL(blob));
          setIsResizing(false);
        },
        format,
        format === "image/png" ? undefined : 0.92
      );
    };

    image.onerror = () => {
      setError("Unable to process the selected image.");
      setIsResizing(false);
    };

    image.src = preview;
  }

  function clearAll() {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    if (resizedUrl) {
      URL.revokeObjectURL(resizedUrl);
    }

    setFile(null);
    setPreview("");
    setResizedUrl("");
    setWidth(0);
    setHeight(0);
    setOriginalWidth(0);
    setOriginalHeight(0);
    setError("");
    setIsResizing(false);
  }

  const extension =
    format === "image/png"
      ? "png"
      : format === "image/webp"
      ? "webp"
      : "jpg";

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="mx-auto max-w-6xl px-6 py-14 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">
            Image Resizer
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Resize JPG, PNG and WebP images to any custom
            width and height directly in your browser.
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
              {/* Original information */}
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
                    {originalWidth} × {originalHeight}px
                  </div>

                  <div>
                    <span className="font-semibold">
                      Size:
                    </span>{" "}
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>
              </div>

              {/* Resize controls */}
              <div className="mt-8">
                <h2 className="mb-4 text-xl font-bold">
                  Resize Settings
                </h2>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="width"
                      className="mb-2 block font-semibold"
                    >
                      Width (px)
                    </label>

                    <input
                      id="width"
                      type="number"
                      min="1"
                      max="10000"
                      value={width}
                      onChange={(event) =>
                        handleWidthChange(
                          Number(event.target.value)
                        )
                      }
                      className="w-full rounded-xl border p-3 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="height"
                      className="mb-2 block font-semibold"
                    >
                      Height (px)
                    </label>

                    <input
                      id="height"
                      type="number"
                      min="1"
                      max="10000"
                      value={height}
                      onChange={(event) =>
                        handleHeightChange(
                          Number(event.target.value)
                        )
                      }
                      className="w-full rounded-xl border p-3 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Aspect ratio */}
                <label className="mt-5 flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={lockRatio}
                    onChange={(event) =>
                      setLockRatio(event.target.checked)
                    }
                    className="h-5 w-5"
                  />

                  <span className="font-medium">
                    🔒 Lock aspect ratio
                  </span>
                </label>

                {/* Format */}
                <div className="mt-6">
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
                    className="w-full rounded-xl border p-3 md:w-72"
                  >
                    <option value="image/jpeg">
                      JPG
                    </option>

                    <option value="image/png">
                      PNG
                    </option>

                    <option value="image/webp">
                      WebP
                    </option>
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  onClick={resizeImage}
                  disabled={isResizing}
                  className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  {isResizing
                    ? "Resizing..."
                    : "📐 Resize Image"}
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
                </div>

                <div>
                  <h2 className="mb-3 text-xl font-bold">
                    Resized Image
                  </h2>

                  <div className="flex min-h-64 items-center justify-center overflow-hidden rounded-xl border bg-gray-50 p-3">
                    {resizedUrl ? (
                      <img
                        src={resizedUrl}
                        alt="Resized image preview"
                        className="max-h-96 w-full object-contain"
                      />
                    ) : (
                      <p className="text-gray-400">
                        Resize the image to see the result.
                      </p>
                    )}
                  </div>

                  {resizedUrl && (
                    <a
                      href={resizedUrl}
                      download={`resized-image.${extension}`}
                      className="mt-4 inline-block rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
                    >
                      ⬇️ Download Resized Image
                    </a>
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
            What is an Image Resizer?
          </h2>

          <p className="mt-4 leading-7 text-gray-700">
            An image resizer changes the dimensions of an
            image by adjusting its width and height. Resizing
            images can help prepare photos for websites,
            social media, documents and other digital
            platforms.
          </p>

          <h2 className="mt-8 text-2xl font-bold">
            Supported Formats
          </h2>

          <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
            <li>JPG / JPEG</li>
            <li>PNG</li>
            <li>WebP</li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold">
            Preserve Aspect Ratio
          </h2>

          <p className="mt-4 leading-7 text-gray-700">
            Enable the lock aspect ratio option to maintain
            the original proportions of your image while
            changing its width or height.
          </p>

          <h2 className="mt-8 text-2xl font-bold">
            Is my image uploaded?
          </h2>

          <p className="mt-4 leading-7 text-gray-700">
            No server upload is required. Image resizing is
            performed directly inside your browser using the
            HTML Canvas API.
          </p>

          <h2 className="mt-8 text-2xl font-bold">
            How to resize an image
          </h2>

          <ol className="mt-4 list-decimal space-y-2 pl-6 text-gray-700">
            <li>Select an image from your device.</li>
            <li>Enter the desired width and height.</li>
            <li>Keep aspect ratio locked if needed.</li>
            <li>Select an output format.</li>
            <li>Click Resize Image.</li>
            <li>Download the resized image.</li>
          </ol>
        </div>
      </section>
    </main>
  );
}