export function optimizeName(name) {
  name = name.replace("\r", "").replace(/(-\s*\d{2,4})|vod|fhd|hd|360p|4k|h264|h265|24fps|60fps|720p|1080p|vod|x264|x265|\.avi|\.mp4|\.mkv|\[.*]|\(.*\)|\{.*\}|-|_|\./gim, " ").replace(/(- \d\d\d\d$)/, "");
  name = name.replace("   ", " ");
  name = name.replace("  ", " ");
  return name.trim();
}

export function minutesToHrs(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);          
  const minutes = totalMinutes % 60;

  const finalTime = (hours > 0 ? hours + ' Hr ' : '') + minutes + ' Min';

  return finalTime;
}

export function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);
  return `${h}:${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;
}