export default function CityCard({ name }) {
  return (
    <div className="flex items-center justify-center rounded-2xl border border-ink/10 bg-white/70 px-4 py-5 text-center transition-colors duration-300 hover:border-ink/25">
      <span className="font-display text-[16px] text-ink sm:text-[17px]">{name}</span>
    </div>
  );
}
