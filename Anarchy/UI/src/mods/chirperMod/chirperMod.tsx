// Credit to Nullpinter for this solution for Flaming Chirper.
import { bindValue, useValue } from "cs2/api";
import mod from "../../../mod.json";
import { getModule } from "cs2/modding";

// These establishes the binding with C# side. Without C# side game ui will crash.
const anarchyEnabled$ = bindValue<boolean>(mod.id, 'AnarchyEnabled');
const flamingChirperOption$ = bindValue<boolean>(mod.id, 'FlamingChirperOption');

// These contain the coui paths to Unified Icon Library svg assets
const uilColored =                         "coui://uil/Colored/";
const anarchyEnabledSrc =          uilColored +  "AnarchyChirper.svg";

const images = getModule("game-ui/game/components/right-menu/right-menu.tsx", "images");                                          
const originalChirper = images.chirper;

export const ChirperModComponent =  (Prev : any) => (props : any) => {
    // These get the value of the bindings.
    const anarchyEnabled : boolean = useValue(anarchyEnabled$);
    const flamingChirperOption : boolean = useValue(flamingChirperOption$);
    
    // This takes the two bools from the bindings and condenses it down to a single bool for both being true.
    const showFlamingChirper : boolean = anarchyEnabled && flamingChirperOption;

    Object.defineProperty(images, "chirper", {
        get: () => showFlamingChirper ? anarchyEnabledSrc : originalChirper, configurable: true,
    });

    return <Prev {...props} />;
}