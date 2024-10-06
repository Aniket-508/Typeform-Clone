import { forwardRef } from "react";
import { cn } from "../../utils/helper.js";

const Section = forwardRef(function ({ className, ...attr }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        "flex justify-center items-center flex-1 text-white px-12 md:px-0 min-h-screen snap-center",
        className
      )}
      {...attr}
    >
      <div className="w-full max-w-2xl relative">{attr?.children}</div>
    </div>
  );
});

Section.Question = function ({ className, ...attr }) {
  return (
    <p
      className={cn("absolute -left-8 md:-left-10 top-1", className)}
      {...attr}
    >
      {attr?.children} →
    </p>
  );
};

Section.Title = function ({ className, ...attr }) {
  return (
    <p className={cn("text-xl md:text-2xl", className)} {...attr}>
      {attr?.children}
    </p>
  );
};

Section.Description = function ({ className, ...attr }) {
  return (
    <p className={cn("text-base md:text-xl opacity-70", className)} {...attr}>
      {attr?.children}
    </p>
  );
};

Section.Options = function ({ className, active, option, ...attr }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between py-1 px-2 border border-white rounded-md bg-[#211f1f] cursor-pointer hover:bg-[#4D4D4D] w-full md:max-w-[250px]",
        active ? "opacity-100" : "opacity-70",
        className
      )}
      {...attr}
    >
      <p className="text-base md:text-xl space-x-2">
        <span
          className={`${
            active ? "bg-white text-black" : "bg-black"
          } px-[6px] pt-1 pb-0.5 border border-white text-sm`}
        >
          {option.id}
        </span>
        <span>{option.name}</span>
      </p>
      {active && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </div>
  );
};

Section.Input = forwardRef(function ({ className, ...attr }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full block border-b bg-transparent pb-1 text-2xl md:text-4xl opacity-70 focus-within:opacity-100 focus:outline-none focus:border-b-white",
        className
      )}
      {...attr}
    />
  );
});

export default Section;
