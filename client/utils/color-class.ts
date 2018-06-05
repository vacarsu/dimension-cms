export function colorClass(color: string): string {
    switch(color) {
        case 'default':
            return 'default';
        case 'primary':
            return 'primary';
        case 'secondary':
            return 'secondary';
        case 'danger':
            return 'danger';
        case 'text':
            return 'text';
        case 'link':
            return 'link';
        default:
            return 'default';
            
    }
}