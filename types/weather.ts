export interface WeatherData{
    name: string,
    main : {
        temp:number,
        humidity : number,
        feels_like : number,
    },
    weather: Array<{
        main : string,
        icon : string,
        description : string;
    }>,
    wind :{
        speed : number,
        
    }
}