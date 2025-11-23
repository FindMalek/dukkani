/**
 * Unified Icons Component
 *
 * This file centralizes all icon exports from lucide-react.
 * All apps should import icons from this file instead of directly from lucide-react
 * to ensure consistency across the codebase.
 *
 * Usage:
 *   import { Icons } from "@dukkani/ui/components/icons";
 *   <Icons.arrowLeft className="..." />
 */

import {
	ArrowLeft,
	ArrowRight,
	Check,
	CheckCircle2,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronUp,
	ChevronsLeft,
	ChevronsRight,
	Circle,
	GripVertical,
	Info,
	LayoutDashboard,
	Loader2,
	Minus,
	Moon,
	MoreHorizontal,
	OctagonX,
	PanelLeft,
	Plus,
	Search,
	Settings,
	ShoppingCart,
	Star,
	Sun,
	TriangleAlert,
	Users,
	X,
	type LucideIcon,
	User2Icon,
	LandmarkIcon,
	StoreIcon,
	PackageIcon,
	HouseIcon,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
	arrowLeft: ArrowLeft,
	arrowRight: ArrowRight,
	chevronDown: ChevronDown,
	chevronLeft: ChevronLeft,
	chevronRight: ChevronRight,
	chevronUp: ChevronUp,
	chevronsLeft: ChevronsLeft,
	chevronsRight: ChevronsRight,
	check: Check,
	circle: Circle,
	x: X,
	plus: Plus,
	minus: Minus,
	search: Search,
	spinner: Loader2,
	moreHorizontal: MoreHorizontal,
	panelLeft: PanelLeft,
	gripVertical: GripVertical,
	layoutDashboard: LayoutDashboard,
	settings: Settings,
	users: Users,
	moon: Moon,
	sun: Sun,
	circleCheck: CheckCircle2,
	info: Info,
	octagonX: OctagonX,
	triangleAlert: TriangleAlert,
	user: User2Icon,
	payments: LandmarkIcon,
	storefront: StoreIcon,
	orders: PackageIcon,
	products: ShoppingCart,
	home: HouseIcon,
	star: Star,
} as const;
