import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Welcome home!</h1>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex" />

      <code className="font-mono font-bold">src/app/page.tsx</code>
      <p />

      <Image
        src="/vercel.svg"
        alt="Vercel Logo"
        className="dark:invert"
        width={100}
        height={24}
        priority
      />

      {/* <a href="www.linkedin.com/in/manan--patel">LinkedIn</Link> */}

      <h2 className="mb-3 text-2xl font-semibold" />

      <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
        -&gt;
      </span>
    </main>
  );
}
