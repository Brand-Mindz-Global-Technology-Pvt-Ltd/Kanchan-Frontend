interface CartProgressProps {
  currentStep?: 1 | 2 | 3;
}

export default function CartProgress({ currentStep = 1 }: CartProgressProps) {
  const steps = [
    { number: 1, label: "Cart Review" },
    { number: 2, label: "Shipping & Address" },
    { number: 3, label: "Secure Payment" },
  ];

  return (
    <div className="w-full border-b border-[#EAEFE5] bg-white py-4 shadow-2xs">
      <div className="mx-auto flex w-[92%] max-w-[1280px] items-center justify-center">
        <div className="flex w-full max-w-[620px] items-center justify-between">
          {steps.map((step, idx) => {
            const isCompleted = step.number < currentStep;
            const isCurrent = step.number === currentStep;

            return (
              <div key={step.number} className="flex flex-1 items-center last:flex-none">
                {/* Step indicator node */}
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-bold transition-all sm:h-8 sm:w-8 sm:text-[13px] ${
                      isCurrent
                        ? "bg-[#06452E] text-white shadow-sm ring-4 ring-[#EBF2E6]"
                        : isCompleted
                        ? "bg-[#1B6E32] text-white"
                        : "bg-[#EDF1EA] text-[#718073]"
                    }`}
                  >
                    {isCompleted ? "✓" : step.number}
                  </div>
                  <span
                    className={`text-[12px] font-semibold transition-colors sm:text-[13.5px] ${
                      isCurrent
                        ? "text-[#18382B]"
                        : isCompleted
                        ? "text-[#1B6E32]"
                        : "text-[#718073]"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Connecting Line between steps */}
                {idx < steps.length - 1 && (
                  <div
                    className={`mx-3 hidden h-[2px] flex-1 sm:block md:mx-4 ${
                      step.number < currentStep ? "bg-[#1B6E32]" : "bg-[#E2E8D8]"
                    }`}
                    aria-hidden="true"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

