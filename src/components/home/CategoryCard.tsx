import type { ReactNode } from "react";

type CategoryCardProps = {
  image: string;
  title: string;
  description?: string;
  iconBg?: string;
  iconColor?: string;
  icon?: ReactNode;
  articleDescription?: string;
  categoryLabel?: string;
  readArticleHref?: string;
};

function CategoryCard({
  image,
  title,
  description,
  iconBg,
  iconColor,
  icon,
  articleDescription,
  categoryLabel,
  readArticleHref,
}: CategoryCardProps) {
  if (articleDescription && categoryLabel && readArticleHref) {
    return (
      <article data-reveal-card className="group flex min-h-[349px] min-w-0 flex-col overflow-hidden rounded-[14px] border border-[#E6E9E0] bg-white shadow-[0_6px_18px_rgba(26,67,36,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(26,67,36,0.12)] sm:h-[349px]">
        <div className="relative aspect-[16/10] sm:aspect-[352/190] w-full shrink-0 overflow-hidden bg-[#F3F1EB]">
          <img
            src={image}
            alt={`${categoryLabel}: ${title}`}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-[18px] pt-4 pb-[14px]">
          <h3 className="whitespace-pre-line text-[19px] font-medium leading-[22px] text-[#183B2B]">
            {title}
          </h3>
          <p className="mt-[7px] text-[12px] leading-4 text-black sm:text-[#637567]">
            {articleDescription}
          </p>
          <a
            href={readArticleHref}
            className="mt-auto inline-flex w-fit items-center gap-1 text-[12px] font-semibold leading-4 text-[#183B2B]"
          >
            Read Article <span aria-hidden="true">›</span>
          </a>
        </div>
      </article>
    );
  }

  return (
    <article data-reveal-card className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[20px] border border-[#19492A1A] bg-white shadow-[0px_10px_30px_0px_#1A432412] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_14px_36px_0px_#1A43241A]">
      {/* Category Image */}
      <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full shrink-0 overflow-hidden bg-[#F3F1EB]">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Category Details */}
      <div className="grid flex-1 grid-cols-[auto_minmax(0,1fr)] grid-rows-[auto_auto] items-center gap-x-2 gap-y-2 bg-white px-3 py-3 sm:flex sm:items-center sm:justify-between sm:gap-3 sm:px-5 sm:py-4">
        {/* Category Icon */}
        <div
          className="row-start-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full sm:h-11 sm:w-11"
          style={{ backgroundColor: iconBg, color: iconColor }}
          aria-hidden="true"
        >
          {icon}
        </div>

        {/* Title and Description */}
        <div className="col-span-2 row-start-2 min-w-0 flex-1 sm:col-auto sm:row-auto">
          <h3 className="text-[13px] font-semibold leading-snug text-[#183B2B] sm:text-[15px]">
            {title}
          </h3>

          <p className="mt-1 text-[10px] leading-[1.35] text-black sm:text-[#637567] line-clamp-2 sm:text-[12px]">
            {description}
          </p>
        </div>

        {/* Arrow Button */}
        <div
          className="col-start-2 row-start-1 flex h-7 w-7 shrink-0 items-center justify-center justify-self-end rounded-full bg-[#184328] text-white shadow-sm transition-transform duration-200 group-hover:translate-x-0.5 sm:col-auto sm:row-auto sm:h-9 sm:w-9 sm:justify-self-auto"
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </div>
      </div>
    </article>
  );
}

export default CategoryCard;
