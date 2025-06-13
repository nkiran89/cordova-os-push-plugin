package com.example.ospushplugin;

import android.widget.Toast;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * This class echoes a string called from JavaScript.
 */
public class OSPushPlugin extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("onNotificationReceived")) {
           
            this.executeBackgroundLogic(callbackContext);
            callbackContext.success();
            return true;
        }
        return false;
    }

    private void executeBackgroundLogic( CallbackContext callbackContext) {
         cordova.getActivity().runOnUiThread(new Runnable() {
            public void run() {
                Toast.makeText(cordova.getActivity(), "Hello World!!", 2000).show();
            }
        });
       
    }
}
