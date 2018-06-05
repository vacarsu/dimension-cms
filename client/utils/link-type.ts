export function linkType(type: string): string {
  switch(type) {
      case 'default':
          return 'default';
      case 'muted':
          return 'muted';
      case 'text':
          return 'text';  
      case 'heading':
          return 'heading';
      case 'reset':
          return 'reset';
      default:
          return 'default'; 
  }
}
