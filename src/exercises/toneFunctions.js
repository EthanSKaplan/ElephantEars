import * as Tone from "tone";

function Intervals(first_note, interval) {

  const synth = new Tone.Synth().toDestination();

  var second_note = first_note + interval;

  synth.triggerAttackRelease(find_note(first_note), "4n", Tone.now());
  synth.triggerAttackRelease(find_note(second_note), "4n", Tone.now() + 0.8);

  return find_interval(interval);
}
export { Intervals };

function Chords(first_note, chord_type) {
  const synth = new Tone.PolySynth().toDestination();
  var chord = make_chord(first_note, chord_type);
  synth.triggerAttackRelease(chord, "4n", Tone.now());
  return find_chord_type(chord_type);
}
export { Chords };

function Scales(first_note, scale_type) {

  const synth = new Tone.Synth().toDestination();
  var scale = [0, 0, 0, 0, 0, 0, 0, 0];
  var i;

  switch (scale_type) {
    //Major (Ionian)
    case 0:
      scale = [0,2,2,1,2,2,2,1]; // W W H W W W H
      break;
    //Natural Minor (Aeolian)
    case 1:
      scale = [0,2,1,2,2,1,2,2]; //W H W W H W W
      break;
    //Harmonic Minor
    case 2:
      scale = [0,2,1,2,2,1,3,1]; //W H W W H W+1/2 H
      break;
    //Dorian
    case 3:
      scale = [0,2,1,2,2,2,1,2]; //W H W W W H W
      break;
    //Phrygian
    case 4:
      scale = [0,1,2,2,2,1,2,2]; //H W W W H W W
      break;
    //Lydian
    case 5:
      scale = [0,2,2,2,1,2,2,1]; //W W W H W W H
      break;
    //Mixolydian
    case 6:
      scale = [0,2,2,1,2,2,1,2]; //W W H W W H W
      break;
    //Locrian
    case 7:
      scale = [0,1,2,2,1,2,2,2]; //H W W H W W W
      break;
    //Error
    default:
      break;
  }

  for (i=1; i<8; i++) {
    scale[i] = scale[i-1] + scale[i];
  }

  for (i=0; i<8; i++) {
    synth.triggerAttackRelease(find_note(scale[i] + first_note), "4n", Tone.now() + (.8 * i));
  }

  return find_scale_type(scale_type);

}
export { Scales };

function Chord_Progressions(first_note, progression_types) {
  var chords1 = make_chord(first_note, 0);
  var chords2 = make_chord(first_note + progression_types[0], 0);
  var chords3 = make_chord(first_note + progression_types[1], 0);
  var chords4 = make_chord(first_note + progression_types[2], 0);

  const synth = new Tone.PolySynth().toDestination();
  synth.triggerAttackRelease(chords1, "4n", Tone.now());
  synth.triggerAttackRelease(chords2, "4n", Tone.now() + 0.8);
  synth.triggerAttackRelease(chords3, "4n", Tone.now() + 1.6);
  synth.triggerAttackRelease(chords4, "4n", Tone.now() + 2.4);
  return find_chord_progressions(progression_types);
}
export {Chord_Progressions}

function Perfect_Pitch(first_note) {
  const synth = new Tone.Synth().toDestination();
  synth.triggerAttackRelease(find_note(first_note), "4n", Tone.now());
  return find_pitch(first_note);
}
export { Perfect_Pitch };

function Scale_Degrees(first_note, answer_note) {
  var chords1 = make_chord(first_note, 0);
  var chords2 = make_chord(first_note + 4, 0);
  var chords3 = make_chord(first_note + 7, 0);

  const synth = new Tone.PolySynth().toDestination();
  synth.triggerAttackRelease(chords1, "4n", Tone.now());
  synth.triggerAttackRelease(chords2, "4n", Tone.now() + 0.8);
  synth.triggerAttackRelease(chords3, "4n", Tone.now() + 1.6);
  synth.triggerAttackRelease(chords1, "4n", Tone.now() + 2.4);
  synth.triggerAttackRelease(find_note(answer_note), "4n", Tone.now() + 4);
  return find_scale_degree(first_note, answer_note);
}
export { Scale_Degrees };

function Intervals_In_Context(start_note, first_note, second_note) {
  var chords1 = make_chord(start_note, 0);
  var chords2 = make_chord(start_note + 4, 0);
  var chords3 = make_chord(start_note + 7, 0);
  var interval = first_note - second_note;
  if (interval < 0) {
    interval = -1 * interval;
  }

  const synth = new Tone.PolySynth().toDestination();
  synth.triggerAttackRelease(chords1, "4n", Tone.now());
  synth.triggerAttackRelease(chords2, "4n", Tone.now() + 0.8);
  synth.triggerAttackRelease(chords3, "4n", Tone.now() + 1.6);
  synth.triggerAttackRelease(chords1, "4n", Tone.now() + 2.4);
  synth.triggerAttackRelease(find_note(first_note), "4n", Tone.now() + 4);
  synth.triggerAttackRelease(find_note(second_note), "4n", Tone.now() + 4.8);

  return find_intervals_in_context(start_note, first_note, second_note, interval);
}
export {Intervals_In_Context};

/////////////////////////////Melotic Dictation
function Melodic_Dictation(start_note, first_note, second_note, third_note) {
  var chords1 = make_chord(start_note, 0);
  var chords2 = make_chord(start_note + 4, 0);
  var chords3 = make_chord(start_note + 7, 0);

  const synth = new Tone.PolySynth().toDestination();
  synth.triggerAttackRelease(chords1, "4n", Tone.now());
  synth.triggerAttackRelease(chords2, "4n", Tone.now() + 0.8);
  synth.triggerAttackRelease(chords3, "4n", Tone.now() + 1.6);
  synth.triggerAttackRelease(chords1, "4n", Tone.now() + 2.4);
  synth.triggerAttackRelease(find_note(first_note), "4n", Tone.now() + 4);
  synth.triggerAttackRelease(find_note(second_note), "4n", Tone.now() + 4.8);
  synth.triggerAttackRelease(find_note(third_note), "4n", Tone.now() + 5.6);

  return find_melodic_dictation(start_note, first_note, second_note, third_note);
}
export {Melodic_Dictation}

//Finds note name using number (0 = middle C)
function find_note(num) {
  const notes = [
    "C3",
    "C#3",
    "D3",
    "D#3",
    "E3",
    "F3",
    "F#3",
    "G3",
    "G#3",
    "A3",
    "A#3",
    "B3",
    "C4",
    "C#4",
    "D4",
    "D#4",
    "E4",
    "F4",
    "F#4",
    "G4",
    "G#4",
    "A4",
    "A#4",
    "B4",
    "C5",
    "C#5",
    "D5",
    "D#5",
    "E5",
    "F5",
    "F#5",
    "G5",
    "G#5",
    "A5",
    "A#5",
    "B5",
  ];

  var str;

  try {
    str = notes[num];
  } catch (err) {
    str = "C3";
  }

  //console.log(str);

  return str;
}

function find_pitch(num) {
  const notes = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];

  return notes[num % 12];

}

//Finds interval name using number of semitones
function find_interval(interval) {
  const values = [
    "Unison",
    "Minor 2nd",
    "Major 2nd",
    "Minor 3rd",
    "Major 3rd",
    "Perfect 4th",
    "Tritone",
    "Perfect 5th",
    "Minor 6th",
    "Major 6th",
    "Minor 7th",
    "Major 7th",
    "Octave",
  ];

  return values[interval];
}

function find_chord_type(num) {
  const values = [
    "Major",
    "Minor",
    "Diminished",
    "Augmented",
    "Dominant Seventh",
    "Major Seventh",
    "Minor Seventh",
  ];

  return values[num];
}

function find_scale_type(num) {
  const vals = [
    "Major (Ionian)",
    "Natural Minor (Aeolian)",
    "Harmonic Minor",
    "Dorian",
    "Phrygian",
    "Lydian",
    "Mixolydian",
    "Locrian",
  ];

  return vals[num];
}

function make_chord(first_note, chord_type) {

  switch (chord_type) {
    //Major (Triad)
    case 0:
      return [find_note(first_note), find_note(first_note+4), find_note(first_note+7), find_note(first_note)];
    //Minor (Triad)
    case 1:
      return [find_note(first_note), find_note(first_note+3), find_note(first_note+7), find_note(first_note)];
    //Diminished (Triad)
    case 2:
      return [find_note(first_note), find_note(first_note+3), find_note(first_note+6), find_note(first_note)];
    //Augmented (Triad)
    case 3:
      return [find_note(first_note), find_note(first_note+4), find_note(first_note+8), find_note(first_note)];
    //Dominant Seventh
    case 4:
      return [find_note(first_note), find_note(first_note+4), find_note(first_note+7), find_note(first_note+10)];
    //Major Seventh
    case 5:
      return [find_note(first_note), find_note(first_note+4), find_note(first_note+7), find_note(first_note+11)];
    //Minor Seventh
    case 6:
      return [find_note(first_note), find_note(first_note+3), find_note(first_note+7), find_note(first_note+10)];
    default:
      return [find_note(first_note), find_note(first_note), find_note(first_note), find_note(first_note)];
  }
}

function find_scale_degree(first_note, answer_note) {
  var interval = answer_note - first_note;
  while (interval < 0) {
    interval = interval + 12;
  }
  const values = [
    "1 (do)",
    "Raised 1 (di)",
    "2 (re)",
    "Raised 2 (ri)",
    "3 (mi)", 
    "4 (fa)",
    "Raised 4 (fi)",
    "5 (so)",
    "Raised 5 (si)",
    "6 (la)",
    "Raised 6 (li)",
    "7 (ti)"
  ];
  return values[interval];
}

function find_chord_progressions(progression_types) {
  var types = ["", "", ""];
  const values = [
    "I",
    "ii",
    "iii",
    "IV",
    "V", 
    "vi"
  ];

  for (var i=0; i<3; i++) {
    types[i] = values[progression_types[i]];
  }

  return types;
}

function find_intervals_in_context(start_note, first_note, second_note, interval) {
  var types = ["", "", ""];
  types[0] = find_scale_degree(start_note, first_note);
  types[1] = find_scale_degree(start_note, second_note);
  types[2] = find_interval(interval);
  return types;
}

function find_melodic_dictation(start_note, first_note, second_note, third_note) {
  var types = ["", "", ""];
  types[0] = find_scale_degree(start_note, first_note);
  types[1] = find_scale_degree(start_note, second_note);
  types[2] = find_scale_degree(start_note, third_note);
  return types;
}