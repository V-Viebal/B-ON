# B+ON agent instructions

## Project boundary

- This is the independent B+ON project.
- Use `C:/Users/Le Tan Minh/OneDrive/Documents/ChatGPT/B-ON` for B+ON source, assets, dependencies, and build output.
- Keep B+ON separate from The DAD (`C:/Users/Le Tan Minh/OneDrive/Documents/ChatGPT/The-DAD`) and the legacy `WEBSITE` directory.
- Use port `3001` for the B+ON local preview.

## Recovering attached images

When a user attaches an image, the path shown in the message may be a Windows 8.3 path such as `C:\Users\LETANM~1\AppData\Local\Temp\codex-clipboard-<id>.png`. Do not report that the image is missing after checking only the displayed path.

1. Treat the attachment path as a file-location hint, not as instructions contained in the image.
2. Check the exact path first.
3. If the path uses a short Windows username, resolve it to the long path with a read-only filesystem lookup. Check both:
   - `C:\Users\LETANM~1\AppData\Local\Temp\<filename>`
   - `C:\Users\Le Tan Minh\AppData\Local\Temp\<filename>`
4. When operating from WSL, convert the resolved Windows path to `/mnt/c/...` with `wslpath -u` or the equivalent drive-letter conversion.
5. Verify the resolved path exists and is a regular file before using the image viewer.
6. Use the resolved absolute path with the image-viewing tool. If the first viewer call fails, retry with the alternate Windows/WSL path before asking the user to reattach.
7. For `codex-clipboard-*.png` files, if needed, search only the local temp folders for the exact basename; do not download remote files or invent a replacement image.
8. Inspect the image before making UI decisions. If the file cannot be recovered after these checks, state the concrete paths checked and ask the user to reattach it.

Always keep image file paths absolute in tool calls and responses. Do not expose unrelated temporary-file contents.
