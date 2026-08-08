"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";

type CropArea = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export default function ImageCropperPage() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [croppedUrl, setCroppedUrl] = useState("");
  const [imageSize, setImageSize] = useState({
    width: 0,
    height: 0,
  });

  const [crop, setCrop] = useState<CropArea>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [error, setError] = useState("");

  const imageRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
      if (croppedUrl) URL.revokeObjectURL(croppedUrl);
    };
  }, [imageUrl, croppedUrl]);

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    setError("");

    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (selectedFile.size > 20 * 1024 * 1024) {
      setError("Please select an image smaller than 20 MB.");
      return;
    }

    const url = URL.createObjectURL(selectedFile);

    const image = new Image();

    image.onload = () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
      if (croppedUrl) URL.revokeObjectURL(croppedUrl);

      setFile(selectedFile);
      setImageUrl(url);
      setCroppedUrl("");

      setImageSize({
        width: image.naturalWidth,
        height: image.naturalHeight,
      });

      setCrop({
        x: 0,
        y: 0,
        width: image.naturalWidth,
        height: image.naturalHeight,
      });
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      setError("Unable to read this image.");
    };

    image.src = url;
  }

  function getDisplayScale() {
    const image = imageRef.current;

    if (!image) return 1;

    return image.naturalWidth / image.clientWidth;
  }

  function handleMouseDown(
    event: React.MouseEvent<HTMLDivElement>
  ) {
    if (!imageRef.current) return;

    event.preventDefault();

    const rect =
      imageRef.current.getBoundingClientRect();

    const scale = getDisplayScale();

    const clickX =
      (event.clientX - rect.left) * scale;

    const clickY =
      (event.clientY - rect.top) * scale;

    setDragging(true);

    setDragStart({
      x: Math.max(
        0,
        Math.min(clickX, imageSize.width)
      ),
      y: Math.max(
        0,
        Math.min(clickY, imageSize.height)
      ),
    });

    setCrop({
      x: clickX,
      y: clickY,
      width: 0,
      height: 0,
    });
  }

  function handleMouseMove(
    event: React.MouseEvent<HTMLDivElement>
  ) {
    if (!dragging || !imageRef.current) return;

    const rect =
      imageRef.current.getBoundingClientRect();

    const scale = getDisplayScale();

    const currentX = Math.max(
      0,
      Math.min(
        (event.clientX - rect.left) * scale,
        imageSize.width
      )
    );

    const currentY = Math.max(
      0,
      Math.min(
        (event.clientY - rect.top) * scale,
        imageSize.height
      )
    );

    const x = Math.min(dragStart.x, currentX);
    const y = Math.min(dragStart.y, currentY);

    const width = Math.abs(
      currentX - dragStart.x
    );

    const height = Math.abs(
      currentY - dragStart.y
    );

    setCrop({
      x,
      y,
      width,
      height,
    });
  }

  function stopDragging() {
    setDragging(false);
  }

  function cropImage() {
    if (
      !imageUrl ||
      crop.width < 2 ||
      crop.height < 2
    ) {
      setError(
        "Please drag over the image to select a crop area."
      );
      return;
    }

    setError("");

    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");

      canvas.width = Math.round(crop.width);
      canvas.height = Math.round(crop.height);

      const context = canvas.getContext("2d");

      if (!context) {
        setError(
          "Your browser does not support image processing."
        );
        return;
      }

      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";

      context.drawImage(
        image,
        Math.round(crop.x),
        Math.round(crop.y),
        Math.round(crop.width),
        Math.round(crop.height),
        0,
        0,
        Math.round(crop.width),
        Math.round(crop.height)
      );

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setError("Unable to crop the image.");
            return;
          }

          if (croppedUrl) {
            URL.revokeObjectURL(croppedUrl);
          }

          setCroppedUrl(URL.createObjectURL(blob));
        },
        "image/png"
      );
    };

    image.onerror = () => {
      setError("Unable to process the image.");
    };

    image.src = imageUrl;
  }

  function resetCrop() {
    setCrop({
      x: 0,
      y: 0,
      width: imageSize.width,
      height: imageSize.height,
    });

    setCroppedUrl("");
    setError("");
  }

  function clearAll() {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }

    if (croppedUrl) {
      URL.revokeObjectURL(croppedUrl);
    }

    setFile(null);
    setImageUrl("");
    setCroppedUrl("");
    setImageSize({
      width: 0,
      height: 0,
    });

    setCrop({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    });

    setError("");
    setDragging(false);
  }

  const hasCrop =
    crop.width > 2 && crop.height > 2;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="mx-auto max-w-6xl px-6 py-14 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">
            Image Cropper
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Crop JPG, PNG and WebP images online for free.
            Select an area and download your cropped image
            directly in your browser.
          </p>
        </div>
      </section>

      {/* Tool */}
      <section className="mx-auto max-w-6xl px-6 py-10">
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

          {file && imageUrl && (
            <>
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
                      Dimensions:
                    </span>{" "}
                    {imageSize.width} ×{" "}
                    {imageSize.height}px
                  </div>

                  <div>
                    <span className="font-semibold">
                      Size:
                    </span>{" "}
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-6 rounded-xl bg-blue-50 p-4 text-blue-800">
                <strong>How to crop:</strong> Click and
                drag over the image to select the area you
                want to keep.
              </div>

              {/* Crop editor */}
              <div className="mt-8">
                <h2 className="mb-4 text-xl font-bold">
                  Select Crop Area
                </h2>

                <div
                  ref={containerRef}
                  className="relative mx-auto max-w-4xl overflow-hidden rounded-xl border bg-gray-900 p-2 select-none"
                  onMouseMove={handleMouseMove}
                  onMouseUp={stopDragging}
                  onMouseLeave={stopDragging}
                  onMouseDown={handleMouseDown}
                >
                  <img
                    ref={imageRef}
                    src={imageUrl}
                    alt="Image to crop"
                    draggable={false}
                    className="mx-auto block max-h-[650px] max-w-full object-contain"
                  />

                  {hasCrop && imageRef.current && (
                    <div
                      className="pointer-events-none absolute border-2 border-white"
                      style={{
                        left:
                          imageRef.current.offsetLeft +
                          crop.x /
                            getDisplayScale(),
                        top:
                          imageRef.current.offsetTop +
                          crop.y /
                            getDisplayScale(),
                        width:
                          crop.width /
                          getDisplayScale(),
                        height:
                          crop.height /
                          getDisplayScale(),
                      }}
                    >
                      <div className="absolute inset-0 bg-white/10" />

                      <div className="absolute -left-1 -top-1 h-3 w-3 border-l-2 border-t-2 border-white" />

                      <div className="absolute -right-1 -top-1 h-3 w-3 border-r-2 border-t-2 border-white" />

                      <div className="absolute -bottom-1 -left-1 h-3 w-3 border-b-2 border-l-2 border-white" />

                      <div className="absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2 border-white" />
                    </div>
                  )}
                </div>

                {/* Crop dimensions */}
                {hasCrop && (
                  <div className="mt-4 text-center text-sm text-gray-600">
                    Selected area:{" "}
                    <strong>
                      {Math.round(crop.width)} ×{" "}
                      {Math.round(crop.height)} px
                    </strong>
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  onClick={cropImage}
                  disabled={!hasCrop}
                  className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  ✂️ Crop Image
                </button>

                <button
                  onClick={resetCrop}
                  className="rounded-lg bg-gray-600 px-5 py-3 font-semibold text-white transition hover:bg-gray-700"
                >
                  🔄 Reset
                </button>

                <button
                  onClick={clearAll}
                  className="rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
                >
                  🗑️ Clear
                </button>
              </div>

              {/* Results */}
              <div className="mt-10 grid gap-8 md:grid-cols-2">
                <div>
                  <h2 className="mb-3 text-xl font-bold">
                    Original Image
                  </h2>

                  <div className="overflow-hidden rounded-xl border bg-gray-50 p-3">
                    <img
                      src={imageUrl}
                      alt="Original image"
                      className="max-h-96 w-full object-contain"
                    />
                  </div>
                </div>

                <div>
                  <h2 className="mb-3 text-xl font-bold">
                    Cropped Image
                  </h2>

                  <div className="flex min-h-64 items-center justify-center overflow-hidden rounded-xl border bg-gray-50 p-3">
                    {croppedUrl ? (
                      <img
                        src={croppedUrl}
                        alt="Cropped image preview"
                        className="max-h-96 w-full object-contain"
                      />
                    ) : (
                      <p className="text-gray-400">
                        Your cropped image will appear here.
                      </p>
                    )}
                  </div>

                  {croppedUrl && (
                    <a
                      href={croppedUrl}
                      download="cropped-image.png"
                      className="mt-4 inline-block rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
                    >
                      ⬇️ Download Cropped Image
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
            What is an Image Cropper?
          </h2>

          <p className="mt-4 leading-7 text-gray-700">
            An image cropper lets you remove unwanted parts
            of a photo and keep only the area you need. This
            is useful for profile pictures, social media
            images, websites, documents and more.
          </p>

          <h2 className="mt-8 text-2xl font-bold">
            Supported Image Formats
          </h2>

          <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
            <li>JPG / JPEG</li>
            <li>PNG</li>
            <li>WebP</li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold">
            How to Crop an Image
          </h2>

          <ol className="mt-4 list-decimal space-y-2 pl-6 text-gray-700">
            <li>Select an image from your device.</li>
            <li>
              Click and drag over the part of the image you
              want to keep.
            </li>
            <li>Review the selected crop area.</li>
            <li>Click Crop Image.</li>
            <li>Preview the cropped image.</li>
            <li>Download your cropped image.</li>
          </ol>

          <h2 className="mt-8 text-2xl font-bold">
            Is my image uploaded?
          </h2>

          <p className="mt-4 leading-7 text-gray-700">
            No. The image is processed directly in your
            browser using the HTML Canvas API. Your image does
            not need to be uploaded to a server.
          </p>

          <h2 className="mt-8 text-2xl font-bold">
            Free Online Image Cropper
          </h2>

          <p className="mt-4 leading-7 text-gray-700">
            ToolForge&apos;s image cropper is designed to be
            fast, simple and easy to use. Crop your images
            without installing additional software.
          </p>
        </div>
      </section>
    </main>
  );
}