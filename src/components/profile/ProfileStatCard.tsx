interface StatItem {
  id: string;
  title: string;
  count: number;
  iconType: "orders" | "wishlist" | "addresses";
  href: string;
}

interface ProfileStatCardProps {
  ordersCount: number;
  wishlistCount: number;
  addressesCount: number;
  onNavigate: (href: string) => void;
}

export default function ProfileStatCard({
  ordersCount,
  wishlistCount,
  addressesCount,
  onNavigate,
}: ProfileStatCardProps) {
  const stats: StatItem[] = [
    {
      id: "stat-orders",
      title: "Orders",
      count: ordersCount,
      iconType: "orders",
      href: "/my-orders",
    },
    {
      id: "stat-wishlist",
      title: "Wishlist",
      count: wishlistCount,
      iconType: "wishlist",
      href: "/wishlist",
    },
    {
      id: "stat-addresses",
      title: "Addresses",
      count: addressesCount,
      iconType: "addresses",
      href: "/address",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 lg:gap-3.5">
      {stats.map((item) => (
        <div
          key={item.id}
          onClick={() => onNavigate(item.href)}
          style={{
            backgroundColor: "#FAF4E8",
            backgroundImage: "linear-gradient(180deg, #FDF8EE 0%, #FAF3E7 100%)",
            borderColor: "#E8DCBE",
            boxShadow: "0 10px 28px -4px rgba(180, 160, 120, 0.16), 0 4px 10px -2px rgba(40, 70, 25, 0.05)",
          }}
          className="group relative overflow-hidden rounded-[20px] sm:rounded-[24px] border p-3 sm:px-4 sm:py-3.5 hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-2.5 sm:gap-3 z-10">
            {/* Circular soft sage-green badge matching Figma */}
            <div
              style={{
                background: "radial-gradient(circle, #E6F0C0 0%, #D6E6A7 100%)",
                border: "1px solid rgba(190, 215, 140, 0.4)",
                color: "#1B381A",
                boxShadow: "0 2px 6px rgba(160, 190, 110, 0.18)",
              }}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform shrink-0"
            >
              {item.iconType === "orders" && (
                <svg
                  className="w-5 h-5 sm:w-5.5 sm:h-5.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Shopping bag body */}
                  <path d="M6 7V19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6Z" />
                  {/* Bag handle */}
                  <path d="M9 7V5a3 3 0 0 1 6 0v2" />
                  {/* Sprout leaf printed in center */}
                  <path
                    d="M12 11c1.5 0 2.5 1 2.5 2.5 0 1.5-1 2.5-2.5 2.5s-2.5-1-2.5-2.5c0-1.5 1-2.5 2.5-2.5Z"
                    fill="currentColor"
                    stroke="none"
                  />
                  <path d="M12 16v1" strokeWidth="1.5" />
                </svg>
              )}

              {item.iconType === "wishlist" && (
                <svg
                  className="w-5 h-5 sm:w-5.5 sm:h-5.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              )}

              {item.iconType === "addresses" && (
                <svg
                  className="w-5 h-5 sm:w-5.5 sm:h-5.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
                </svg>
              )}
            </div>

            {/* Metric Value & Label */}
            <div>
              <span
                style={{ color: "#163B1C" }}
                className="block font-serif-heading text-[24px] sm:text-[27px] font-bold leading-none"
              >
                {item.count}
              </span>
              <span
                style={{ color: "#566C59" }}
                className="text-[12px] sm:text-[13px] font-medium mt-1 block"
              >
                {item.title}
              </span>
            </div>
          </div>

          {/* Circular green action arrow button matching Figma */}
          <div
            style={{
              backgroundColor: "#3E6B24",
              boxShadow: "0 2px 6px rgba(62, 107, 36, 0.35)",
            }}
            className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full text-white flex items-center justify-center group-hover:brightness-110 group-hover:translate-x-0.5 transition-all z-10 shrink-0"
          >
            <svg
              className="w-3 h-3 sm:w-3.5 sm:h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
