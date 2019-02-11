---
title: Default modal
---

You can trigger a modal on any element, just add the `data-modal` attribute and specify the id of the target modal context. You can write the modal context mark-up anywhere in your DOM structure, the JS will automatically move it to the document root.

You can add the `data-modal-close` attribute to any child of the modal. Clicking it will close the modal. Clicking outside of a modal window or pressing the <key>esc</key> key will also close the active modal.
