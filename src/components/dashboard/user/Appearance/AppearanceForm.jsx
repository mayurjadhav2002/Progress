import React from "react";
import { Label } from "../../../ui/label";
import styles from "../../../../styles/appearance.module.css";
import { useTheme } from "../../../../utils/themeContext/theme-provider";

function AppearanceForm() {
    const { setTheme } = useTheme()

  return (
    <div>
      <div className={styles.appearance}>
        <Label>Theme</Label>
        <div className={`flex mt-3 gap-5 ${styles.appearance}`}>
          <label>
            <input
              type="radio"
              name="theme"
              value="light"
              onClick={() => setTheme("light")}
              className={styles.opacity0}
            />
            <div className="selector items-center rounded-md border-2 border-muted p-1 hover:border-accent ">
              <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                  <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
              </div>
            </div>
            <span className="block w-full p-2 text-center font-normal">
              Light
            </span>
          </label>

          <label>
            <input
              type="radio"
              name="theme"
              value="dark"
              onClick={() => setTheme("dark")}
              className={styles.opacity0}
            />
            <div className="selector items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-dark hover:text-accent-foreground bg-[#262626]">
              <div className="space-y-2 rounded-sm bg-gray-950 p-2">
                <div className="space-y-2 rounded-md bg-gray-800 p-2 shadow-sm">
                  <div className="h-2 w-[80px] rounded-lg bg-gray-400" />
                  <div className="h-2 w-[100px] rounded-lg bg-gray-400" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-gray-800 p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-gray-400" />
                  <div className="h-2 w-[100px] rounded-lg bg-gray-400" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-gray-800 p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-gray-400" />
                  <div className="h-2 w-[100px] rounded-lg bg-gray-400" />
                </div>
              </div>
            </div>
            <span className="block w-full p-2 text-center font-normal">
              Dark
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default AppearanceForm;
