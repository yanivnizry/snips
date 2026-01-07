export interface ExpandableDescriptionProps {
  readonly description: string;
  readonly maxLength?: number;
  readonly onExpandedChange?: (isExpanded: boolean) => void;
  readonly titleHeight?: number;
}

