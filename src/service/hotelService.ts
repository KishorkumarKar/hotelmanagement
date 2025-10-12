import { IHotel } from "../interface/hotelInterface";
import Hotel from "../models/hotelModels";

export const add=async(data:IHotel)=>{
        const hotel = new Hotel(data);
        return hotel.save();
};

