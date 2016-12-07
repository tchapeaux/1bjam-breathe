SCRIPT_EVENTS = []

SCRIPT_EVENTS.push(new EventPlaySound("Door opens", 0.5));
SCRIPT_EVENTS.push(new EventSilence(0.5));
SCRIPT_EVENTS.push(new EventPlaySound("Footsteps", 2));
SCRIPT_EVENTS.push(new EventSilence(1));
SCRIPT_EVENTS.push(new EventDialogLine("Youri", "Here we are. This is the house.", 4));
SCRIPT_EVENTS.push(new EventSilence(1));
SCRIPT_EVENTS.push(new EventDialogLine("Nikita", "Keep your mouth shut! She's here. She has the artifact.", 4));
SCRIPT_EVENTS.push(new EventSilence(0.5));
SCRIPT_EVENTS.push(new EventDialogLine("Youri", "Mouth shut or not, we will find her. Then we will kill her", 3));
SCRIPT_EVENTS.push(new EventSilence(0.5));
SCRIPT_EVENTS.push(new EventDialogLine("Nikita", "Go upstairs. I'll check this room", 2));
SCRIPT_EVENTS.push(new EventSilence(0.5));
SCRIPT_EVENTS.push(new EventPlaySound("Gun clicks", 0.5));
SCRIPT_EVENTS.push(new EventSilence(0.5));
SCRIPT_EVENTS.push(new EventDialogLine("Thomas Chapeaux", "WAOU LE STRESS mais y'a pas encore de reste de jeu", 100));

