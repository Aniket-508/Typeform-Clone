export default function Footer() {
  return (
    <div className="px-4 py-2 flex flex-row flex-wrap items-center justify-between gap-x-4 gap-y-2 w-full sticky bottom-0">
      <a
        rel="noopener noreferrer nofollow"
        className="flex items-center gap-2 cursor-pointer text-zinc-400 hover:text-white text-xs"
        href="https://aniket-pawar.vercel.app/"
        target="_blank"
      >
        <img
          src="/profile.jpg"
          alt="Aniket Pawar"
          loading="lazy"
          decoding="async"
          className="size-4 rounded-full"
        />
        Made by Aniket Pawar
      </a>
      <a
        rel="noopener noreferrer nofollow"
        className="text-black text-xs flex items-center gap-1 px-1.5 py-1 cursor-pointer bg-white hover:bg-yellow-50 rounded"
        href="https://www.buymeacoffee.com/aniketpawar508"
        target="_blank"
      >
        <img
          src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
          alt="Buy me a coffee"
          loading="lazy"
          decoding="async"
          className="size-4 rounded-full"
        />
        Buy me a coffee
      </a>
    </div>
  );
}
