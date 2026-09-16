import PDFDocument from "pdfkit";

export const pdfDownload = async (req, res) => {
  try {
    const { result } = req.body;

    if (!result) {
      return res.status(400).json({
        error: "No content provided",
      });
    }

    const doc = new PDFDocument({
      margin: 50,
    });

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="ExamNotesAI.pdf"'
    );

    doc.pipe(res);

    // =========================
    // TITLE
    // =========================

    doc
      .fontSize(20)
      .text("ExamNotes AI", {
        align: "center",
      });

    doc.moveDown();

    doc
      .fontSize(14)
      .text(`Importance: ${result.importance || "N/A"}`);

    doc.moveDown();

    // =========================
    // SUB TOPICS
    // =========================

    doc.fontSize(16).text("Sub Topics");

    doc.moveDown(0.5);

    if (result.subTopics) {
      Object.entries(result.subTopics).forEach(([star, topics]) => {
        doc.moveDown(0.5);

        doc.fontSize(13).text(`${star} Topics:`);

        topics.forEach((topic) => {
          doc
            .fontSize(12)
            .text(`• ${topic}`);
        });
      });
    }

    doc.moveDown();

    // =========================
    // NOTES
    // =========================

    doc.fontSize(16).text("Notes");

    doc.moveDown(0.5);

    if (result.notes) {
      const cleanNotes = result.notes
        .replace(/[*#]/g, "")
        .replace(/\n{3,}/g, "\n\n");

      doc.fontSize(11).text(cleanNotes);
    }

    doc.moveDown();

    // =========================
    // REVISION POINTS
    // =========================

    doc.fontSize(16).text("Revision Points");

    doc.moveDown(0.5);

    if (result.revisionPoints) {
      result.revisionPoints.forEach((point) => {
        doc
          .fontSize(12)
          .text(`• ${point}`);
      });
    }

    doc.moveDown();

    // =========================
    // IMPORTANT QUESTIONS
    // =========================

    doc.fontSize(16).text("Important Questions");

    doc.moveDown(0.5);

    // Short Questions

    doc.fontSize(13).text("Short Questions:");

    if (result.questions?.short) {
      result.questions.short.forEach((question) => {
        doc
          .fontSize(12)
          .text(`• ${question}`);
      });
    }

    doc.moveDown(0.5);

    // Long Questions

    doc.fontSize(13).text("Long Questions:");

    if (result.questions?.long) {
      result.questions.long.forEach((question) => {
        doc
          .fontSize(12)
          .text(`• ${question}`);
      });
    }

    doc.moveDown(0.5);

    // Diagram Question

    doc.fontSize(13).text("Diagram Question:");

    if (result.questions?.diagram) {
      doc
        .fontSize(12)
        .text(result.questions.diagram);
    }

    doc.moveDown();

    // =========================
    // MERMAID DIAGRAM
    // =========================

    if (result.diagram?.data) {
      doc.fontSize(16).text("Diagram");

      doc.moveDown(0.5);

      doc
        .fontSize(10)
        .text(
          "Mermaid Diagram Definition:"
        );

      doc.moveDown(0.5);

      doc
        .fontSize(9)
        .text(result.diagram.data);

      doc.moveDown();
    }

    // =========================
    // CHARTS
    // =========================

    if (result.charts && result.charts.length > 0) {
      doc.fontSize(16).text("Charts");

      doc.moveDown(0.5);

      result.charts.forEach((chart) => {
        doc.fontSize(13).text(chart.title);

        doc.moveDown(0.3);

        // Chart data

        if (chart.data && chart.data.length > 0) {
          chart.data.forEach((item) => {
            doc
              .fontSize(11)
              .text(
                `${item.name}: ${item.value}`
              );
          });
        }

        doc.moveDown();
      });
    }

    // =========================
    // END PDF
    // =========================

    doc.end();

  } catch (error) {
    console.log(error);

    if (!res.headersSent) {
      return res.status(500).json({
        error: "Failed to generate PDF",
      });
    }
  }
};