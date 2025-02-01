import GitHub from 'public/static/icons/github.svg';
import NextJS from 'public/static/icons/nextjs.svg';
import React from 'public/static/icons/react.svg';
import Spotify from 'public/static/icons/spotify.svg';
import TailwindCSS from 'public/static/icons/tailwind.svg';
import Typescript from 'public/static/icons/typescript.svg';
import Vercel from 'public/static/icons/vercel.svg';

const icons = {
  React,
  GitHub,
  Typescript,
  NextJS,
  TailwindCSS,
  Vercel,
  Spotify,
};

type BrandIconProps = {
  type: keyof typeof icons;
  className?: string;
};

export default function BrandIcon({
  type,
  className = 'h-16 w-16 lg:h-14 lg:w-14 xl:h-20 xl:w-20',
}: BrandIconProps) {
  const Icon = icons[type];

  if (!Icon) {
    return <div>Missing icon for {type}.</div>;
  }

  return <Icon className={className} fill="currentColor" />;
}
