
let a: HTMLAnchorElement;
export function downloadFile(content: string, filename: string) {
  a ??= document.createElement("a");
  a.href =
    "data:text/plain;charset=utf-8," + encodeURIComponent(content + "\n");
  a.download = filename;
  a.click();
  a;
}

let input: HTMLInputElement;
export function uploadFile(
  onload: (content: string, name: string) => void,
  accept = ".txt"
) {
  input ??= document.createElement("input");
  input.type = "file";
  input.onchange = () => {
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ({ target }) => onload(target?.result as string, file.name);
    reader.readAsText(file);
  };
  input.accept = accept;
  input.click();
}

