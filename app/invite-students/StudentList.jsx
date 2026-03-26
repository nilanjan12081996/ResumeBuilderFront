import { useEffect, useState, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Pagination } from "flowbite-react"
import { invitedStudentsList, saveInvitedStudent } from "../reducers/InviteSlice"
import { convertToSubmitFormat } from "../utils/DateSubmitFormatter"

// Resume type filter options
const RESUME_TYPE_OPTIONS = [
  { value: "all",  label: "All Types" },
  { value: "imp",  label: "Improve Existing Resume" },
  { value: "link", label: "LinkedIn Rewrite" },
]

// Date sort options
const DATE_SORT_OPTIONS = [
  { value: "none",       label: "Sort by Date" },
  { value: "start_asc",  label: "Start Date A → Z" },
  { value: "start_desc", label: "Start Date Z → A" },
  { value: "end_asc",    label: "End Date A → Z" },
  { value: "end_desc",   label: "End Date Z → A" },
]

const ITEMS_PER_PAGE = 10

const StudentList = () => {
  const { studentsData } = useSelector((state) => state?.inviteStd)
  const dispatch = useDispatch()

  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [resumeTypeFilter, setResumeTypeFilter] = useState("all")
  const [dateSort, setDateSort]       = useState("none")
  const [selectedRows, setSelectedRows] = useState([])
  const [sendingInvite, setSendingInvite] = useState(false)

  const onPageChange = (page) => { setCurrentPage(page); setSelectedRows([]) }

  // ── সব data একবারে fetch করো ─────────────────────────────────────────────
  useEffect(() => {
    dispatch(invitedStudentsList({ page: 1, limit: 9999 }))
  }, [])

  const rawData = studentsData?.data || []

  // ── helpers ──────────────────────────────────────────────────────────────
  const getResumeCount = (item) =>
    (item.link_count || 0) + (item.imp_count || 0)

  const getResumeBreakdown = (item) => {
    const parts = []
    if (item.imp_count)  parts.push(`${item.imp_count} Improve Existing Resume`)
    if (item.link_count) parts.push(`${item.link_count} LinkedIn Rewrite`)
    return parts.join(" · ") || "0"
  }

  const hasResumeType = (item, type) => {
    if (type === "imp")  return (item.imp_count  || 0) > 0
    if (type === "link") return (item.link_count || 0) > 0
    return true
  }

  // ── filter + sort ─────────────────────────────────────────────────────────
  const filteredData = useMemo(() => {
    let data = rawData.filter((item) => {
      const name  = item?.user?.fullname?.toLowerCase() || ""
      const email = item?.user?.email?.toLowerCase()    || ""
      const phone = item?.user?.phone                   || ""
      const query = searchQuery.toLowerCase()
      const matchesSearch = !query || name.includes(query) || email.includes(query) || phone.includes(query)
      const matchesType   = resumeTypeFilter === "all" || hasResumeType(item, resumeTypeFilter)
      return matchesSearch && matchesType
    })

    if (dateSort !== "none") {
      data = [...data].sort((a, b) => {
        const field = dateSort.startsWith("start") ? "start_date" : "end_date"
        const dir   = dateSort.endsWith("asc") ? 1 : -1
        return (a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0) * dir
      })
    }

    return data
  }, [rawData, searchQuery, resumeTypeFilter, dateSort])

  // ── filter/sort বদলালে page 1 এ ফিরে যাবে ────────────────────────────────
  useEffect(() => {
    setCurrentPage(1)
    setSelectedRows([])
  }, [searchQuery, resumeTypeFilter, dateSort])

  // ── client-side pagination ────────────────────────────────────────────────
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE) || 1

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredData.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredData, currentPage])

  // ── selection ─────────────────────────────────────────────────────────────
  const toggleRow = (id) => setSelectedRows((prev) =>
    prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
  )
  const toggleAll = () =>
    setSelectedRows(
      selectedRows.length === filteredData.length ? [] : filteredData.map((d) => d.id)
    )

  const selectedStudents = filteredData.filter((d) => selectedRows.includes(d.id))

  const handleBulkInvite = () => {
    if (!selectedRows.length) return
    setSendingInvite(true)
    // TODO: dispatch(saveInvitedStudent({ ids: selectedRows })).then(...)
    setTimeout(() => { setSendingInvite(false); setSelectedRows([]) }, 1500)
  }

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative">

      {/* ── Floating Action Bar ── */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-in-out ${
        selectedRows.length > 0
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-6 pointer-events-none"
      }`}>
        <div className="bg-[#1a1a2e] text-white rounded-2xl shadow-2xl px-5 py-3 flex items-center gap-4 min-w-[440px]">
          {/* Avatar stack */}
          <div className="flex items-center -space-x-2 flex-shrink-0">
            {selectedStudents.slice(0, 4).map((s) => (
              <div key={s.id}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-[#1a1a2e] flex items-center justify-center text-white text-xs font-bold">
                {s?.user?.fullname?.charAt(0)?.toUpperCase() || "?"}
              </div>
            ))}
            {selectedStudents.length > 4 && (
              <div className="w-8 h-8 rounded-full bg-[#800080] border-2 border-[#1a1a2e] flex items-center justify-center text-white text-xs font-bold">
                +{selectedStudents.length - 4}
              </div>
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white leading-tight">
              {selectedRows.length} student{selectedRows.length > 1 ? "s" : ""} selected
            </p>
            <p className="text-xs text-gray-400 leading-tight">Ready to send invite{selectedRows.length > 1 ? "s" : ""}</p>
          </div>
          <button onClick={() => setSelectedRows([])}
            className="text-gray-400 hover:text-white text-xs px-3 py-1.5 rounded-lg hover:bg-white/10 transition flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Deselect
          </button>
          {/* Fill Form button */}
          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent('fill-invite-form', { detail: selectedStudents }))
            }}
            className="bg-white/10 hover:bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-2 transition whitespace-nowrap border border-white/20"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Fill Form
          </button>
          <button onClick={handleBulkInvite} disabled={sendingInvite}
            className="bg-[#800080] hover:bg-[#6a006a] disabled:opacity-70 text-white text-sm font-semibold px-5 py-2 rounded-xl flex items-center gap-2 transition whitespace-nowrap">
            {sendingInvite ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Sending...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Invite{selectedRows.length > 1 ? "s" : ""}
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div>
          <h4 className="text-xl font-bold text-gray-900">Invited Students</h4>
          <p className="text-sm text-gray-400 mt-0.5">{studentsData?.totalData ?? 0} total students</p>
        </div>

        {/* Search */}
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="Search by name, email, phone..."
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-9 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* ── Filter bar ── */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {/* Resume type filter */}
        <select value={resumeTypeFilter} onChange={(e) => setResumeTypeFilter(e.target.value)}
          className="py-1.5 px-3 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 transition">
          {RESUME_TYPE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        {/* Date sort */}
        <select value={dateSort} onChange={(e) => setDateSort(e.target.value)}
          className="py-1.5 px-3 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 transition">
          {DATE_SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        {/* Active filter chips */}
        {resumeTypeFilter !== "all" && (
          <span className="inline-flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full font-medium">
            {RESUME_TYPE_OPTIONS.find((o) => o.value === resumeTypeFilter)?.label}
            <button onClick={() => setResumeTypeFilter("all")} className="ml-1 hover:text-purple-900">×</button>
          </span>
        )}
        {dateSort !== "none" && (
          <span className="inline-flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full font-medium">
            {DATE_SORT_OPTIONS.find((o) => o.value === dateSort)?.label}
            <button onClick={() => setDateSort("none")} className="ml-1 hover:text-purple-900">×</button>
          </span>
        )}
      </div>

      {/* ── Selection hint ── */}
      {selectedRows.length === 0 && filteredData.length > 0 && (
        <div className="flex items-center gap-2 mb-3 text-xs text-gray-400 bg-purple-50 border border-purple-100 rounded-lg px-3 py-2 w-fit">
          <svg className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Select checkboxes, then use <strong className="text-purple-600">Send Invite</strong> from the bar below</span>
        </div>
      )}

      {/* ── Table ── */}
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 w-10">
                <input type="checkbox"
                  checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                  onChange={toggleAll}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Mobile</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Start Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">End Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Resumes</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => {
                const isSelected = selectedRows.includes(item.id)
                return (
                  <tr key={item.id} onClick={() => toggleRow(item.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? "bg-purple-50 border-l-2 border-l-purple-500" : "bg-white hover:bg-purple-50/30"
                    }`}>
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" checked={isSelected} onChange={() => toggleRow(item.id)}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer" />
                    </td>

                    {/* Student */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {item?.user?.fullname?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{item?.user?.fullname || "—"}</p>
                          <p className="text-xs text-gray-400">{item?.user?.email || "—"}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-gray-600">{item?.user?.phone || "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{convertToSubmitFormat(item?.start_date) || "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{convertToSubmitFormat(item?.end_date) || "—"}</td>

                    {/* Resumes */}
                    <td className="px-4 py-3">
                      <span className="font-semibold text-gray-800">{getResumeCount(item)}</span>
                      <p className="text-[11px] text-gray-400 mt-0.5 max-w-[220px] leading-relaxed">
                        {getResumeBreakdown(item)}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      {item.status === 1 ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-green-50 text-green-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>Inactive
                        </span>
                      )}
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-16">
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <svg className="w-10 h-10 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-sm font-medium">No students found</p>
                    <p className="text-xs">Try adjusting your search or filters</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-5">
          <Pagination
            layout="pagination"
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            previousLabel=""
            nextLabel=""
            showIcons
          />
        </div>
      )}
    </div>
  )
}

export default StudentList

// import { Checkbox, Pagination, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput } from "flowbite-react"
// import { useEffect, useState } from "react"
// import { AiOutlineEdit } from "react-icons/ai"
// import { BiFilter } from "react-icons/bi"
// import { MdOutlineDelete } from "react-icons/md"
// import { RiSearchLine } from "react-icons/ri"
// import { useDispatch, useSelector } from "react-redux"
// import { invitedStudentsList } from "../reducers/InviteSlice"
// import { convertToSubmitFormat } from "../utils/DateSubmitFormatter"

// const StudentList=()=>{
//     const{studentsData}=useSelector((state)=>state?.inviteStd)
//     const dispatch=useDispatch()
//        const [totalPage, setTotalPage] = useState(1);
//       const [limit, setLimit] = useState(10);
//       const [currentPage, setCurrentPage] = useState(1);
//          const onPageChange = (page) => {
//     setCurrentPage(page);
//   };
//     useEffect(()=>{
//         dispatch(invitedStudentsList({
//             page:currentPage,
//             limit:limit
//         })).then((res)=>{
//             console.log("inviteRes",res);
//             const total=res?.payload?.page
//             setTotalPage(Number.isInteger(total) && total > 0 ? total : 1)
            
//         })
// },[currentPage,limit])
// console.log("studentsData",studentsData);

//     return(
//         <>
//                 <div className='bg-white rounded-[10px] p-5 lg:p-10'>
//                     <div className='lg:flex justify-between items-center mb-4'>
//                         <h4 className='text-[20px] text-[#151515] font-semibold pb-5'>Invited Students</h4>
//                         <div className='flex items-center gap-2 lg:w-3/12 search_section'>
//                             <div className='w-10/12'>
//                                 <div className='bg-[#F3F4F6] rounded-[8px] flex gap-2 items-center pl-2'>
//                                     <button className='w-[42px] h-[42px] flex justify-center items-center cursor-pointer'>
//                                         <RiSearchLine className='text-xl text-[#999999]' />
//                                     </button>
//                                     <TextInput id="base" type="text" sizing="md" placeholder='Search resume...' className='w-full pl-0' />
//                                 </div>
//                             </div>
//                             <div className='w-2/12'>
//                                 <div className='flex justify-center items-center gap-4'>
//                                     <button className='bg-white hover:bg-[#a635a2] text-black hover:text-white border border-[#D5D5D5] rounded-[8px] w-[42px] h-[42px] flex justify-center items-center cursor-pointer'><BiFilter className='text-3xl text-[#686868]' /></button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div> 
//                     <div className='invited_students_table_wrap'>
//                         <div className="overflow-x-auto">
//                             <Table hoverable>
//                                 <TableHead>
//                                     <TableRow>
//                                         <TableHeadCell className="p-4 bg-[#f0f0f0]">
//                                           <Checkbox />
//                                         </TableHeadCell>
//                                         <TableHeadCell className='bg-[#f0f0f0]'>Name</TableHeadCell>
//                                         <TableHeadCell className='bg-[#f0f0f0]'>Last Date </TableHeadCell>
//                                         <TableHeadCell className='bg-[#f0f0f0]'>Mobile No</TableHeadCell>
//                                         <TableHeadCell className='bg-[#f0f0f0]'>Email ID</TableHeadCell>
//                                         <TableHeadCell className='bg-[#f0f0f0]'>Number of Resume</TableHeadCell>
//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody className="divide-y">
//                                     {
//                                         studentsData?.data?.map((stds)=>(
//                                         <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
//                                         <TableCell className="p-4 bg-[#ffffff] border-b border-[#f0f0f0]">
//                                            <Checkbox />
//                                         </TableCell>
//                                         <TableCell className="bg-[#ffffff] border-b border-[#f0f0f0]">{stds?.user?.fullname}</TableCell>
//                                         <TableCell className="bg-[#ffffff] border-b border-[#f0f0f0]">{convertToSubmitFormat(stds?.last_date)}</TableCell>
//                                         <TableCell className="bg-[#ffffff] border-b border-[#f0f0f0]">{stds?.user?.phone}</TableCell>
//                                         <TableCell className="bg-[#ffffff] border-b border-[#f0f0f0]">{stds?.user?.email}</TableCell>
//                                         <TableCell className="bg-[#ffffff] border-b border-[#f0f0f0]">{stds?.resume_access}</TableCell>
//                                         {/* <TableCell className='flex items-center gap-6 bg-[#ffffff] border-b border-[#f0f0f0] pb-[20px]'>

//                                             <button className='text-[#4E7FFF] hover:text-black cursor-pointer'><AiOutlineEdit className='text-2xl' /></button>
//                                             <button className='text-[#FF4B4B] hover:text-black cursor-pointer'><MdOutlineDelete className='text-2xl' /></button>
//                                         </TableCell> */}
//                                     </TableRow>
//                                         ))
//                                     }
                                    
                                 
//                                 </TableBody>
//                             </Table>
//                         </div>
//                     </div>
//                     {
//                         studentsData?.page>1&&(
//                             <>
//                                  <div className="flex justify-center items-center mt-4 pagination_sec">
//                                         <Pagination
//                                           layout="pagination"
//                                           currentPage={currentPage}
//                                           totalPages={totalPage}
//                                           onPageChange={onPageChange}
//                                           previousLabel=""
//                                           nextLabel=""
//                                           showIcons
//                                         />
//                                       </div>
//                             </>
//                         )
//                     }
                  
//                 </div>
//         </>
//     )
// }
// export default StudentList

