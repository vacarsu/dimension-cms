declare function require(name:string);
declare var UIkit;

declare interface ObjectConstructor {
    assign(target: any, ...sources: any[]): any;
}

declare module "react-color" {
    export const SketchPicker: any;
}

declare module "react-resizable" {
    export const ResizableBox: any;
}

declare module "re-resizable" {
    const Resizable: any;
    export default Resizable;
}

// declare module "uikit-react" {
//     export const Accordion: any;
//     export const AccordionItem: any;
//     export const Alert: any;
//     export const Article: any;
//     export const Badge: any;
//     export const Breadcrumb: any;
//     export const Button: any;
//     export const Card: any;
//     export const CardBody: any;
//     export const CardFooter: any;
//     export const CardHeader: any;
//     export const CardTitle: any;
//     export const Container: any;
//     export const Cover: any;
//     export const Dark: any;
//     export const Dropdown: any;
//     export const Flex: any;
//     export const Checkbox: any;
//     export const Fieldset: any;
//     export const Form: any;
//     export const Input: any;
//     export const InputContainer: any;
//     export const FormLabel: any;
//     export const Legend: any;
//     export const Radio: any;
//     export const Range: any;
//     export const Select: any;
//     export const SelectOption: any;
//     export const Textarea: any;
//     export const Grid: any;
//     export const Icon: any;
//     export const Image: any;
//     export const Label: any;
//     export const Light: any;
//     export const Lightbox: any;
//     export const LightboxItem: any;
//     export const Link: any;
//     export const List: any;
//     export const ListItem: any;
//     export const Margin: any;
//     export const Nav: any;
//     export const NavItem: any;
//     export const Navbar: any;
//     export const NavbarContainer: any;
//     export const NavbarDropdown: any;
//     export const NavbarSticky: any;
//     export const Offcanvas: any;
//     export const OffcanvasContainer: any;
//     export const Overlay: any;
//     export const Panel: any;
//     export const Parallax: any;
//     export const Progress: any;
//     export const Scrollspy: any;
//     export const Section: any;
//     export const Sidebar: any;
//     export const Slideshow: any;
//     export const Tab: any;
//     export const TabContainer: any;
//     export const TabContent: any;
//     export const Table: any;
//     export const TableBody: any;
//     export const TableData: any;
//     export const TableFoot: any;
//     export const TableHead: any;
//     export const TableHeader: any;
//     export const TableRow: any;
// }

// interface BaseProps {
//     className?: string;
//     style?: string;
//     align?: string;
//     height?: string;
//     width?: string;
//     background?: string;
//     position?: string;
// }