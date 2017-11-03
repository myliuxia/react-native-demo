package com.frontreact;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.AsyncTask;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.alibaba.fastjson.JSONObject;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import gnnt.MEBS.patchmaker.GoogleDiffPatchMakerFactory;
import gnnt.MEBS.patchmaker.output.FileOutput;
import gnnt.MEBS.patchmaker.source.FileSource;
import gnnt.MEBS.patchmaker.source.SimpleStringSource;

/*******************************************************************
 * HotLoaddingActivity.java 2017/9/14
 * <P>
 * <br/>
 * <br/>
 * </p>
 * Copyright2017 by GNNT Company. All Rights Reserved.
 *
 * @author:Zhoupeng
 ******************************************************************/
public class HotLoaddingActivity extends Activity {


    private TextView tvLocal;

    private TextView tvProgress;

    private Button btnRetry;

    private UpdateBundleTask mTask;

    SharedPreferences mShared;

    static final String KEY_VERSION = "version";

    private int mLocalVersion = 0;

    static final String BUNDLE_FILE = "main.bundle";

    String bundlePath;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_hot_loadding);
        tvLocal = (TextView) findViewById(R.id.tv_local_version);
        tvProgress = (TextView) findViewById(R.id.tv_progress);
        btnRetry = (Button) findViewById(R.id.btn_retry);

        mShared = getSharedPreferences("Espot", 0);
        mLocalVersion = mShared.getInt(KEY_VERSION, 0);

        bundlePath = getCacheDir().getPath() + File.pathSeparator + BUNDLE_FILE;
        if (!checkLocalFile()) { // 如果本地文件为空，则版本为0
            mLocalVersion = 0;
        }
        tvLocal.setText("本地版本: " + mLocalVersion);
        btnRetry.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (mTask != null && !mTask.isCancelled()) {
                    mTask.cancel(true);
                }
                mTask = new UpdateBundleTask();
                mTask.execute();
                btnRetry.setVisibility(View.INVISIBLE);
            }
        });


        mTask = new UpdateBundleTask();
        mTask.execute();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (mTask != null && !mTask.isCancelled()) {
            mTask.cancel(true);
        }
    }

    class UpdateBundleTask extends AsyncTask<Void, String, Boolean> {

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            tvProgress.setText("准备获取更新内容...");
        }

        @Override
        protected Boolean doInBackground(Void... params) {
            String urlString = "http://182.150.46.244:8880/ReactHot/UpdateServlet";
            InputStream inputStream = null;
            ByteArrayOutputStream byteArrayOutputStream = null;
            boolean isSuccess = false;
            try {
                URL url = new URL(urlString);
                HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
                urlConnection.setReadTimeout(30 * 1000);
                urlConnection.setRequestMethod("GET");
                urlConnection.setRequestProperty("Accept-Encoding", "identity");
                // 发送POST请求必须设置如下两行
                urlConnection.setDoOutput(true);
                urlConnection.setDoInput(true);
                OutputStream output = urlConnection.getOutputStream();
                output.write(JSONObject.toJSONString(new UpdateRequest(mLocalVersion)).getBytes("utf-8"));
                output.flush();
                output.close();

                // 数据大小
                int length = urlConnection.getContentLength();
                int readLength = 0;
                byte[] temp = new byte[1024];
                int readBytesLength;
                inputStream = new BufferedInputStream(urlConnection.getInputStream());
                byteArrayOutputStream = new ByteArrayOutputStream();
                while ((readBytesLength = inputStream.read(temp)) != -1) {
                    byteArrayOutputStream.write(temp, 0, readBytesLength);
                    readLength += readBytesLength;
                    publishProgress("正在更新:" + (readLength / length * 100) + "%");
                }
                String result = new String(byteArrayOutputStream.toByteArray(), "utf-8");
                UpdateResponse response = JSONObject.parseObject(result, UpdateResponse.class);
                if (response.resultCode < 0) {
                    throw new Exception("返回码:" + response.resultCode + "-返回信息:" + response.message);
                }
                if (response.versionNumber == mLocalVersion) {
                    isSuccess = true;
                } else {
                    if (TextUtils.isEmpty(response.updateContent)) {
                        throw new Exception("返回有更新，但更新内容为空");
                    }
                    if (response.isHotLodding) {
                        publishProgress("与本地代码合并...");
                        FileSource oldSource = new FileSource(bundlePath);
                        SimpleStringSource patchSource = new SimpleStringSource(response.updateContent);
                        FileOutput resultOutput = new FileOutput(bundlePath);
                        isSuccess = GoogleDiffPatchMakerFactory.getPatchMaker().applyPatch(oldSource, patchSource, resultOutput);
                        if (!isSuccess) {
                            throw new Exception("本地合并补丁失败");
                        }

                    } else {
                        publishProgress("覆盖更新...");
                        FileOutput resultOutput = new FileOutput(bundlePath);
                        isSuccess = resultOutput.outputPatchedContent(response.updateContent);
                        if (!isSuccess) {
                            throw new Exception("本地覆盖更新失败");
                        }
                    }
                }
                // 保存新版本号
                if (isSuccess) {
                    mShared.edit().putInt(KEY_VERSION, response.versionNumber).commit();
                }

                urlConnection.disconnect();
            } catch (Exception e) {
                publishProgress("更新失败，错误信息:\n" + e.toString() + ":" + e.getMessage());
                e.printStackTrace();
            } finally {
                try {
                    if (inputStream != null) {
                        inputStream.close();
                    }
                    if (byteArrayOutputStream != null) {
                        byteArrayOutputStream.close();
                    }
                } catch (Exception e2) {
                }
            }

            return isSuccess;
        }

        @Override
        protected void onProgressUpdate(String... values) {
            tvProgress.setText(values[0]);
        }

        @Override
        protected void onPostExecute(Boolean result) {
            if (result) {
                Intent intent = new Intent(HotLoaddingActivity.this, LocalMainActivity.class);
                startActivity(intent);
                finish();
            } else {
                btnRetry.setVisibility(View.VISIBLE);
            }
        }
    }

    public boolean checkLocalFile() {
        File bundleFile = new File(bundlePath);
        return bundleFile.exists();
    }

    public static class UpdateRequest {

        public UpdateRequest(int num) {
            versionNum = num;
        }

        public int versionNum;
        public int clientType = 0;
    }

    public static class UpdateResponse {
        /**
         * 返回码
         */
        public long resultCode;

        /**
         * 返回信息
         */
        public String message;

        /**
         * 版本信息
         */
        public String versionInfo;

        /**
         * 版本号
         */
        public int versionNumber;
        /**
         * 是否为热更新
         */
        public boolean isHotLodding;

        /**
         * 更新内容
         */
        public String updateContent;
    }
}
