"use client";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

export default function FallbackImage({ src, alt, className }: Props) {
  return (
    <img
      src={src || "/images/fallback-category.svg"}
      alt={alt}
      className={className}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src =
          "/images/fallback-category.svg";
      }}
    />
  );
}
