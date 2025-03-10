import { ReactNode } from "react";

export type AccordionProps = {
  title?: string | ReactNode;
  children: ReactNode;
  detailsClassName?: string;
  summaryClassName?: string;
  open?: boolean;
};

const Accordion = ({
  title,
  children,
  detailsClassName = "",
  summaryClassName = "",
  open = true,
}: AccordionProps) => (
  <details
    className={`shadow-lg p-4 group w-fit ${detailsClassName}`}
    open={open}
  >
    <summary
      className={`block font-bold text-large cursor-pointer text-black group-hover:text-primary-500 duration-200 ${summaryClassName}`}
    >
      {title}
    </summary>
    <div className="mt-4 pt-4 border-t-2 border-black group-hover:border-primary-500 duration-200">
      {children}
    </div>
  </details>
);

export default Accordion;
