export const QuillOptions = {
    theme: 'snow',
    placeholder: '请输入文本内容',
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['blockquote', 'code-block'],
            [{ header: [1, 2, 3, 4, false] }],
            [{ 'align': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'direction': 'rtl' }],
            ['link', 'image'],
            ['clean']
        ]
    },
};
