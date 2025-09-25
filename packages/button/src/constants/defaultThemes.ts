import { ButtonThemes } from "../types/themes"

/**
 * Default theme configuration for the Button component
 * These values serve as the base configuration that can be overridden via the config prop
 */
export const defaultThemes: ButtonThemes = {
  light: {
    primary: {
      default: {
        backgroundColor: "#000",
        borderColor: "#000",
        color: "#fff",
      },
      disabled: {
        backgroundColor: "#e3e3e3",
        borderColor: "#ccc",
        color: "#888",
      },
      attention: {
        backgroundColor: "#00A2FF",
        borderColor: "#00A2FF",
        color: "#fff",
      },
      success: {
        backgroundColor: "#24BC66",
        borderColor: "#24BC66",
        color: "#fff",
      },
      warning: {
        backgroundColor: "#F7674A",
        borderColor: "#F7674A",
        color: "#fff",
      },
    },
    secondary: {
      default: {
        backgroundColor: "transparent",
        borderColor: "#ccc",
        color: "#000",
      },
      disabled: {
        backgroundColor: "transparent",
        borderColor: "#ccc",
        color: "#888",
      },
      attention: {
        backgroundColor: "transparent",
        borderColor: "#00A2FF",
        color: "#00A2FF",
      },
      success: {
        backgroundColor: "transparent",
        borderColor: "#24BC66",
        color: "#24BC66",
      },
      warning: {
        backgroundColor: "transparent",
        borderColor: "#F7674A",
        color: "#F7674A",
      },
    },
  },
  dark: {
    primary: {
      default: {
        backgroundColor: "#fff",
        borderColor: "#fff",
        color: "#000",
      },
      disabled: {
        backgroundColor: "#333",
        borderColor: "#555",
        color: "#888",
      },
      attention: {
        backgroundColor: "#00A2FF",
        borderColor: "#00A2FF",
        color: "#fff",
      },
      success: {
        backgroundColor: "#24BC66",
        borderColor: "#24BC66",
        color: "#fff",
      },
      warning: {
        backgroundColor: "#F7674A",
        borderColor: "#F7674A",
        color: "#fff",
      },
    },
    secondary: {
      default: {
        backgroundColor: "transparent",
        borderColor: "rgba(255,255,255,0.25)",
        color: "#fff",
      },
      disabled: {
        backgroundColor: "transparent",
        borderColor: "#333",
        color: "#888",
      },
      attention: {
        backgroundColor: "transparent",
        borderColor: "#00A2FF",
        color: "#00A2FF",
      },
      success: {
        backgroundColor: "transparent",
        borderColor: "#24BC66",
        color: "#24BC66",
      },
      warning: {
        backgroundColor: "transparent",
        borderColor: "#F7674A",
        color: "#F7674A",
      },
    },
  },
}
