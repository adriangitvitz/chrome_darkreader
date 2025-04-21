function fixCodeMirrorStyles() {
    const codeMirrorElements = document.querySelectorAll(
        '.CodeMirror, [class*="CodeMirror"], .cm-editor, [class*="cm-"], .react-codemirror2, [data-keybinding="codemirror"]'
    );

    codeMirrorElements.forEach(element => {
        element.style.setProperty('background-color', 'inherit', 'important');

        element.style.setProperty('background-color', '#161B2E', 'important');

        element.style.setProperty('color', '#DCDFE4', 'important');

        const children = element.querySelectorAll('*');

        children.forEach(child => {
            child.style.setProperty('background-color', 'inherit', 'important');
        });

        element.classList.add('codemirror-excluded');
    });

    const codeBlocks = document.querySelectorAll('.cm-line, .CodeMirror-line, [class*="CodeMirror-code"]');
    codeBlocks.forEach(block => {
        block.style.setProperty('background-color', 'transparent', 'important');
    });

    const enhancementStyles = document.createElement('style');
    enhancementStyles.textContent = `
    .CodeMirror-line::selection,
    .CodeMirror-line > span::selection,
    .CodeMirror-line > span > span::selection,
    .cm-content::selection,
    .cm-line::selection {
      background-color: rgba(121, 172, 217, 0.6) !important;
      color: #FFFFFF !important;
    }

    .CodeMirror-selected,
    .cm-selectionBackground {
      background-color: rgba(121, 172, 217, 0.6) !important;
    }

    /* Cursor styles */
    .CodeMirror-cursor, .cm-cursor {
      border-left: 2px solid #ec9a34 !important;
      animation: cursorBlink 1s infinite !important;
    }

    .CodeMirror, .cm-editor, .cm-content {
      caret-color: #ec9a34 !important;
    }

    @keyframes cursorBlink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `;

    document.head.appendChild(enhancementStyles);
}

fixCodeMirrorStyles();
setTimeout(fixCodeMirrorStyles, 1000);

const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        if (mutation.addedNodes.length) {
            fixCodeMirrorStyles();
        }
    }
});

observer.observe(document.body, { childList: true, subtree: true });
