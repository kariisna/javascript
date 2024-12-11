document.getElementById('convertButton').addEventListener('click', async () => {
    const fileInput = document.getElementById('fileInput');
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = ''; // Reset pesan kesalahan

    if (fileInput.files.length === 0) {
        errorMessage.textContent = 'Silakan pilih file DOCX!';
        return;
    }

    const file = fileInput.files[0];

    try {
        const arrayBuffer = await file.arrayBuffer();
        const { value: html } = await mammoth.convertToHtml({ arrayBuffer });

        const cleanHtml = DOMPurify.sanitize(html);
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.html(cleanHtml, {
            callback: function (doc) {
                doc.save(file.name.replace(/\.docx$/, '.pdf'));
            },
            x: 10,
            y: 10,
            html2canvas: { scale: 0.5 }
        });
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        errorMessage.textContent = 'Gagal mengonversi file. Silakan coba lagi.';
    }
});
