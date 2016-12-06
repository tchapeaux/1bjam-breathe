SCRIPT_EVENTS = []

SCRIPT_EVENTS.push(new EventPlaySound("Doors open", 1));
SCRIPT_EVENTS.push(Silence(0.5));
SCRIPT_EVENTS.push(new EventDialogLine("Youri", "Here we are. This is the house.", 3));
SCRIPT_EVENTS.push(Silence(0.5));
SCRIPT_EVENTS.push(new EventDialogLine("Nikita", "Keep your mouth shut! She's here. She has the artifact.", 3));

