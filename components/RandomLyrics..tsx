'use client';

import { useState, useEffect } from 'react';
import { CustomLink } from './CustomLink';

const lyrics = [
  {
    lines: [
      'On the other side, I have survived',
      "Didn't think it'd be",
      "The hardest path I've ever walked",
      'Alive again... alive as me',
    ],
    source: 'Nachtmystium - On The Other Side',
    link: 'https://www.youtube.com/watch?v=JIcxAbkHElI',
  },
  {
    lines: [
      'So go and kneel and wait',
      'And join the herd',
      'You know a million sheep',
      'Will be dispersed',
      "By one lion's roar",
    ],
    source: "Rome - One Lion's Roar",
    link: 'https://www.youtube.com/watch?v=eKafdEM3z5I',
  },
  {
    lines: [
      "Remember you're unique",
      'Just like anybody else',
      "So don't grow wishbones",
      'Where the backbone ought to be',
      'Before all else be armed',
    ],
    source: 'Rome - Der Wolfsmantel',
    link: 'https://www.youtube.com/watch?v=O2crwL7yw5c',
  },
  {
    lines: [
      'You can find the answer',
      'The solution lies within the problem',
      'The answer is in every question',
      'Dig it?',
      'An attitude is all you need to rise and walk away',
      'Inspire yourself',
      'Your life is yours',
      'It fits you like your skin',
    ],
    source: 'Funkadelic - Good Thoughts, Bad Thoughts',
    link: 'https://www.youtube.com/watch?v=UGGVy4RkUs0',
  },
  {
    lines: [
      'One world, one federation, a million tribes',
      'When will you find the courage to join the good fight?',
      "Some of you think we're cruel and enraged",
      "Some of you think that we're blind to the wars you wage",
      'Ballots and bullets cannot debate what we know',
      'Ballots and bullets cannot deface the truth we hold',
    ],
    source: 'Rome - Ballots and Bullets',
    link: 'https://www.youtube.com/watch?v=VkyNfyWq7QM',
  },
  {
    lines: [
      'Sie haben uns aufgeteilt in Länder, in Klassen und Kulturen',
      'Jetzt kämpfen wir gegeneinander und wissen nicht, wofür',
      'So lang wir weiter glauben, dass wir verschieden sind, bleiben wir ihre Sklaven',
      'Wir brauchen diese Schutzhaft nicht',
    ],
    source: 'Frau Potz - Klockenschooster',
    link: 'https://www.youtube.com/watch?v=QhCov4XREMs',
  },
];

export function RandomLyrics() {
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    setIndex(Math.floor(Math.random() * lyrics.length));
  }, []);

  if (index === -1) {
    return null;
  }

  const randomLyrics = lyrics[index];

  return (
    <div className="text-right text-lg text-gray-600 dark:text-gray-300">
      {randomLyrics.lines.map((line, index) => (
        <span key={index} className="block italic">
          {line}
        </span>
      ))}
      <br />
      <CustomLink
        className="text-blue-700 underline hover:text-yellow-900 dark:text-blue-200 dark:hover:text-yellow-100"
        href={randomLyrics.link}
      >
        {randomLyrics.source}
      </CustomLink>
    </div>
  );
}
