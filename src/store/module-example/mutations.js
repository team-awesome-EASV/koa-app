import { workshop } from "app/firebase";

export function setWorkshops ( state ) {
    let workshopList = [];
    workshop.onSnapshot( ( workshopItems ) => {
        workshopList = [];
        workshopItems.forEach( ( doc ) => {
            var workShopData = doc.data();
            workshopList.push( {
                ...workShopData,
                id: doc.id
            } );
        } );
        state.workshops = workshopList;
    } );
}
