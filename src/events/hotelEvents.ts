import { EventEmitter } from "events";

// define event types (optional but good for TS safety)
interface EventMap {
  hotelDeletedId: string;
  hotelDeletedIdCreated: { id: string; name: string };
}

class HotelEvents extends EventEmitter {
  private static instance: HotelEvents;

  private constructor() {
    super();
  }

  public static getInstance(): HotelEvents {
    if (!HotelEvents.instance) {
      HotelEvents.instance = new HotelEvents();
    }
    return HotelEvents.instance;
  }

  // 🔒 typed emit
  public emitEvent<K extends keyof EventMap>(event: K, data: EventMap[K]) {
    super.emit(event, data);
  }

  // 🔒 typed on
  public onEvent<K extends keyof EventMap>(
    event: K,
    listener: (data: EventMap[K]) => void,
  ) {
    super.on(event, listener);
  }
}

export default HotelEvents.getInstance();
