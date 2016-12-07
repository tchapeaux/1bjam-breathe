SCRIPT_EVENTS = []

SCRIPT_EVENTS.push(new EventSilence(3));
SCRIPT_EVENTS.push(new EventPlaySound("Door opens", 1));
SCRIPT_EVENTS.push(new EventPlaySound("Footsteps", 2));
SCRIPT_EVENTS.push(new EventDialogLine("Vladimir", "Here we are. This is the house.", 4));
SCRIPT_EVENTS.push(new EventDialogLine("Youri", "Keep your mouth shut! She's here. She has the artifact.", 4));
SCRIPT_EVENTS.push(new EventSilence(0.5));
SCRIPT_EVENTS.push(new EventDialogLine("Vladimir", "Mouth shut or not, we will find her. Then we will kill her", 3));
SCRIPT_EVENTS.push(new EventDialogLine("Youri", "Go upstairs. I'll check this room", 2));
SCRIPT_EVENTS.push(new EventSilence(0.5));
SCRIPT_EVENTS.push(new EventPlaySound("Gun clicks", 1));
SCRIPT_EVENTS.push(new EventDialogLine("Thomas Chapeaux", "WAOU LE STRESS mais y'a pas encore de reste de jeu", 100));

