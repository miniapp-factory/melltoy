"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share } from "@/components/share";
import Image from "next/image";
import { url } from "@/lib/metadata";

type Question = {
  text: string;
  options: { text: string; animal: string }[];
};

const questions: Question[] = [
  {
    text: "What is your favorite activity?",
    options: [
      { text: "Chasing balls", animal: "dog" },
      { text: "Climbing trees", animal: "fox" },
      { text: "Sleeping all day", animal: "hamster" },
      { text: "Running fast", animal: "horse" },
      { text: "Playing with yarn", animal: "cat" },
    ],
  },
  {
    text: "Which environment do you prefer?",
    options: [
      { text: "Home", animal: "cat" },
      { text: "Park", animal: "dog" },
      { text: "Forest", animal: "fox" },
      { text: "Farm", animal: "horse" },
      { text: "Cage", animal: "hamster" },
    ],
  },
  {
    text: "How do you handle stress?",
    options: [
      { text: "Purr and relax", animal: "cat" },
      { text: "Bark loudly", animal: "dog" },
      { text: "Run away", animal: "fox" },
      { text: "Stand tall", animal: "horse" },
      { text: "Hide in a burrow", animal: "hamster" },
    ],
  },
  {
    text: "What is your favorite food?",
    options: [
      { text: "Fish", animal: "cat" },
      { text: "Bones", animal: "dog" },
      { text: "Berries", animal: "fox" },
      { text: "Grass", animal: "horse" },
      { text: "Seeds", animal: "hamster" },
    ],
  },
  {
    text: "How do you greet people?",
    options: [
      { text: "Purr softly", animal: "cat" },
      { text: "Wag tail", animal: "dog" },
      { text: "Sniff", animal: "fox" },
      { text: "Nod", animal: "horse" },
      { text: "Crawl", animal: "hamster" },
    ],
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (animal: string) => {
    setAnswers((prev) => [...prev, animal]);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      const scores: Record<string, number> = {};
      answers.concat(animal).forEach((a) => {
        scores[a] = (scores[a] || 0) + 1;
      });
      const maxAnimal = Object.entries(scores).reduce((a, b) =>
        b[1] > a[1] ? b : a
      )[0];
      setResult(maxAnimal);
    }
  };

  const retake = () => {
    setCurrent(0);
    setAnswers([]);
    setResult(null);
  };

  if (result) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-semibold">You are a {result}!</h2>
        <Image
          src={`/${result}.png`}
          alt={result}
          width={512}
          height={512}
          className="rounded"
        />
        <Share text={`I am a ${result}! Check out this quiz: ${url}`} />
        <Button onClick={retake}>Retake Quiz</Button>
      </div>
    );
  }

  const shuffledOptions = shuffleArray(
    questions[current].options
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-medium">{questions[current].text}</h2>
      <div className="flex flex-col gap-2">
        {shuffledOptions.map((opt, idx) => (
          <Button
            key={idx}
            onClick={() => handleAnswer(opt.animal)}
            variant="outline"
          >
            {opt.text}
          </Button>
        ))}
      </div>
    </div>
  );
}
