/**
 * Unified Icons Component
 *
 * This file centralizes all icon exports from lucide-react and react-icons.
 * All apps should import icons from this file instead of directly from lucide-react or react-icons
 * to ensure consistency across the codebase.
 *
 * Usage:
 *   import { Icons } from "@dukkani/ui/components/icons";
 *   <Icons.arrowLeft className="..." />
 *   <Icons.google className="..." />
 */

import {
	ArrowLeft,
	ArrowRight,
	Check,
	CheckCircle2,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	ChevronUp,
	Circle,
	CompassIcon,
	Copy,
	GripVertical,
	HouseIcon,
	Info,
	Key,
	LandmarkIcon,
	LayoutDashboard,
	Loader2,
	type LucideIcon,
	Minus,
	Moon,
	MoreHorizontal,
	OctagonX,
	PackageIcon,
	PanelLeft,
	Plus,
	Search,
	Settings,
	ShoppingCart,
	Star,
	StoreIcon,
	Sun,
	TriangleAlert,
	User2Icon,
	Users,
	X,
} from "lucide-react";
import { FaApple, FaFacebook, FaGoogle, FaTelegram } from "react-icons/fa";

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
	google: FaGoogle,
	apple: FaApple,
	facebook: FaFacebook,
	telegram: FaTelegram,
	logo: CompassIcon,
	key: Key,
	copy: Copy,
} as const;
