export type LoungeStatus = "available" | "reserved";

export interface Lounge {
  id: number;
  name: string;
  status: LoungeStatus;
  position: {
    x: number; // percentage
    y: number; // percentage
  };
}

export const lounges: Lounge[] = [
  { id: 1, name: "Lounge 1", status: "available", position: { x: 10, y: 20 } },
  { id: 2, name: "Lounge 2", status: "reserved", position: { x: 30, y: 25 } },
  { id: 3, name: "Lounge 3", status: "available", position: { x: 50, y: 30 } },
  { id: 4, name: "Lounge 4", status: "available", position: { x: 70, y: 35 } },
  { id: 5, name: "VIP Booth 1", status: "available", position: { x: 20, y: 60 } },
  { id: 6, name: "VIP Booth 2", status: "reserved", position: { x: 40, y: 65 } },
  { id: 7, name: "Bar Side Table", status: "available", position: { x: 80, y: 70 } },
];
