export enum PrimaryStatus {
    Normal,
    Sleep,
    Burn,
    Faint,
    None
  }
export interface Status {
  
    primary: PrimaryStatus;
  
  
    confused: boolean;
  }
  