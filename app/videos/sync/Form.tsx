"use client";
import { Formik, Form, Field } from "formik";

interface Props {
  setVideos: (videos: any) => void;
}

export default function SyncForm({ setVideos }: Props) {
  return (
    <Formik
      enableReinitialize
      initialValues={{
        searchKey: "",
        channelId: "",
      }}
      onSubmit={async (values) => {
        const formData = new FormData();
        formData.append("searchKey", values.searchKey);
        formData.append("channelId", values.channelId);

        const result = await fetch("/videos/sync/searchAndSync/", {
          method: "POST",
          body: formData,
        });
        const data = await result.json();

        if (data?.videos) setVideos(data.videos);
      }}
    >
      {({ handleReset }) => (
        <Form className="mt-4 flex flex-col w-full max-w-lg bg-white p-4">
          <div className="flex flex-wrap mx-3 mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Search keyword
            </label>
            <Field
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="searchKey"
              name="searchKey"
              type="text"
              placeholder=""
            />
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Channel Id
            </label>
            <Field
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="channelId"
              name="channelId"
              type="text"
              placeholder=""
            />

            <div className="w-full flex flex-row mt-6 gap-x-4">
              <button
                className="bg-purple-400 text-sm font-semibold cursor-pointer hover:bg-white text-black w-40 p-2"
                type="submit"
              >
                Search
              </button>
              <button
                className="bg-gray-200 text-sm font-semibold cursor-pointer hover:bg-white text-black w-40 p-2"
                onClick={handleReset}
              >
                Cancel
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
