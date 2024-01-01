import React, { useEffect, useState } from 'react'
import { useUserContext } from '../../../utils/UserContext/UserContext'
import { getProjectCounts } from '../../../utils/Queries';

function Card() {
    const { user, userActivityCount, setUserActivityCount } = useUserContext()
    const [DataFetched, setDataFetched] = useState(false)
    if (!DataFetched) {
        try {
            if (user?._id) {
                getProjectCounts(user._id)
                    .then((res) => {
                        setUserActivityCount(res);
                    }).then((data) => setDataFetched(true))

                    .catch((error) => {
                        console.error('Error fetching user activity counts:', error);
                    });
                const timeoutId = setTimeout(() => {
                    setDataFetched(false);
                }, 5 * 60 * 1000); // 5 minutes in milliseconds

                // Cleanup the timeout on component unmount
                return () => clearTimeout(timeoutId);
            }
        } catch (error) {
            console.log("Some error occured", error)
        }
    }
    if (!userActivityCount || !userActivityCount.success) {
        return "Loading"
    }
    return (
        <section className="bg-white">
            <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">


                <div className="mt-8 sm:mt-12">
                    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                            <dt className="order-last text-lg font-medium text-gray-500">Projects Created</dt>

                            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">{userActivityCount.projectCount}</dd>
                        </div>

                        <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                            <dt className="order-last text-lg font-medium text-gray-500">Documents Written</dt>

                            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">{userActivityCount.documentCount}</dd>
                        </div>

                        <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                            <dt className="order-last text-lg font-medium text-gray-500">Docs Shared with you</dt>

                            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">{userActivityCount.sharedDocuments}</dd>
                        </div>


                    </dl>

                    <dl className="grid grid-cols-1 gap-10 px-5 pt-2 sm:grid-cols-2">
                        <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                            <dt className="order-last text-lg font-medium text-gray-500">Stored Used for Project</dt>

                            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">{(userActivityCount.projectStorageStats / 1024).toFixed(2)} Mb</dd>
                        </div>

                        <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                            <dt className="order-last text-lg font-medium text-gray-500">Storage used for documents</dt>

                            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">{(userActivityCount.documentsStorageStats / 1024).toFixed(2)} Mb</dd>
                        </div>

                    </dl>
                </div>
            </div>
        </section>
    )
}

export default Card