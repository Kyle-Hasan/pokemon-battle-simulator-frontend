import { FieldEffects } from "./FieldEffects";
import { HazardState } from "./HazardState";
import { TerrainEffect } from "./TerrainEffect";
import { WeatherEffect } from "./WeatherEffect";

export interface Environment {
   
    weather: WeatherEffect;
  
 
    terrain: TerrainEffect;
  
  
    hazards: HazardState;
  
  
    fieldEffects: FieldEffects;
  }