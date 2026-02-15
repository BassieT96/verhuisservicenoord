import { createElement, type ComponentType, type ReactNode, type SVGProps } from "react";
import {
  BoxIcon,
  BuildingIcon,
  ClockIcon,
  FileTextIcon,
  PhoneIcon,
  RouteIcon,
  ShieldIcon,
  TruckIcon,
} from "@/components/ui/icons";
import type { CmsIconKey } from "@/sanity/lib/content";

export type SectionIcon = ComponentType<SVGProps<SVGSVGElement>>;

const iconMap: Record<CmsIconKey, SectionIcon> = {
  box: BoxIcon,
  building: BuildingIcon,
  clock: ClockIcon,
  file: FileTextIcon,
  phone: PhoneIcon,
  route: RouteIcon,
  shield: ShieldIcon,
  truck: TruckIcon,
};

export function resolveSectionIcon(iconKey: CmsIconKey) {
  return iconMap[iconKey] ?? FileTextIcon;
}

export function renderSectionIcon(iconKey: CmsIconKey, width = 20, height = 20): ReactNode {
  switch (iconKey) {
    case "box":
      return createElement(BoxIcon, { width, height });
    case "building":
      return createElement(BuildingIcon, { width, height });
    case "clock":
      return createElement(ClockIcon, { width, height });
    case "phone":
      return createElement(PhoneIcon, { width, height });
    case "route":
      return createElement(RouteIcon, { width, height });
    case "shield":
      return createElement(ShieldIcon, { width, height });
    case "truck":
      return createElement(TruckIcon, { width, height });
    case "file":
    default:
      return createElement(FileTextIcon, { width, height });
  }
}
