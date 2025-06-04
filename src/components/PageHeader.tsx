import { cn } from "@/lib/utils";
import { ElementType, ReactNode } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

interface PageHeaderProps {
  title?: string;
  description?: string;
  children?: ReactNode;
  showBreadcrumb?: boolean;
  links: { title: string; href: string; icon?: ElementType }[];
}

const PageHeader = ({
  title,
  description,
  showBreadcrumb = true,
  links,
}: PageHeaderProps) => {
  return (
    <div className="bg-muted/30 mb-8 border-b">
      <div
        className={cn(
          "px-4",
          !title && !description ? "py-0 pt-3" : "py-6 md:py-8",
        )}
      >
        {showBreadcrumb && (
          <div className="mb-4">
            <Breadcrumb>
              <BreadcrumbList>
                {links.map((item, idx) => (
                  <>
                    <BreadcrumbItem key={idx}>
                      <BreadcrumbLink
                        href={item.href}
                        className={cn(
                          "flex items-center gap-2 text-[15px]",
                          idx === links.length - 1 &&
                            "text-black dark:text-white",
                        )}
                      >
                        {item.icon && <item.icon className="size-5" />}
                        {item.title}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {idx !== links.length - 1 && <BreadcrumbSeparator />}
                  </>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        )}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight md:text-2xl">
              {title}
            </h2>
            {description && (
              <p className="text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
