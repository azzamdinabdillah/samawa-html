/**
 * Initialize inline MCDatepicker instances for all inputs with class "datepicker-input".
 * - Each input is targeted by its unique id (required): `#<inputId>`
 * - The picker is rendered inline (not as a modal), using the theme below.
 * - Colors are customized to match the brand (primary: #ff48b6).
 */

// Select all inputs with class "datepicker-input"
const datepickerInputs = document.querySelectorAll(".datepicker-input");
datepickerInputs.forEach(function (input) {
  const inputId = input.id;
  // Create an MCDatepicker instance for each input
  const picker = MCDatepicker.create({
    el: `#${inputId}`,
    bodyType: "inline",
    theme: {
      theme_color: "#ff48b6",
      main_background: "#ffffff",
      active_text_color: "#000000",
      inactive_text_color: "rgba(0, 0, 0, 0.3)",
      display: {
        foreground: "#ffffff",
        background: "#ff48b6",
      },
      picker: {
        foreground: "#000000",
        background: "#ffffff",
      },
      picker_header: {
        active: "#000000",
        inactive: "rgba(0, 0, 0, 0.3)",
      },
      weekday: {
        foreground: "#ff48b6",
      },
      button: {
        success: {
          foreground: "#ff48b6",
        },
        danger: {
          foreground: "#e65151",
        },
      },
      date: {
        active: {
          default: {
            foreground: "#000000",
          },
          picked: {
            foreground: "#ffffff",
            background: "#ff48b6",
          },
          today: {
            foreground: "#000000",
            background: "rgba(255, 72, 182, 0.1)",
          },
        },
        inactive: {
          default: {
            foreground: "rgba(0, 0, 0, 0.3)",
          },
          picked: {
            foreground: "#ff48b6",
            background: "rgba(255, 72, 182, 0.1)",
          },
          today: {
            foreground: "rgba(0, 0, 0, 0.3)",
            background: "rgba(0, 0, 0, 0.05)",
          },
        },
        marcked: {
          foreground: "#ff48b6",
        },
      },
      month_year_preview: {
        active: {
          default: {
            foreground: "#000000",
          },
          picked: {
            foreground: "#ffffff",
            background: "#ff48b6",
          },
        },
        inactive: {
          default: {
            foreground: "rgba(0, 0, 0, 0.3)",
          },
          picked: {
            foreground: "rgba(0, 0, 0, 0.3)",
            background: "rgba(0, 0, 0, 0.05)",
          },
        },
      },
    },
  });
});
