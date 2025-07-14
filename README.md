# Giới thiệu

`expo-macro-ui` là một thư viện react native expo chứa một số components có sẵn giúp xây dựng UI một cách nhanh chóng. Ta có thể dùng lệnh để kết xuất từng phần tử giúp không bị nặng.

Note: Hướng dẫn này hướng dẫn theo dự án `expo` và `expo-router`

# Bắt đầu

Cài đặt thư viện `expo-macro-ui`

Bước đầu tiên: `yarn add --dev expo-macro-ui`

Sau đó chạy lệnh `yarn expo-macro-ui add init`

Note: Bạn có thể cài `expo-macro-ui add all` để cài tất cả

Cài đặt `react-native-unistyles`

Cài đặt `react-native-unistyles` [Tại đây]("https://www.unistyl.es/v3/start/getting-started").

Sau đó làm theo hướng dẫn với expo-router [Tại đây]("https://www.unistyl.es/v3/guides/expo-router")

Ở file như hướng dẫn. file `unistyles.ts` ở `./macro-ui/themes/unistyles/unistyles`
Thay

```js
import "expo-router/entry";
import "./unistyles";
```

bằng

```js
import 'expo-router/entry'
import 'src/macro-ui/themes/unistyles/unistyles’
```

giờ đã sẵn sàng rồi. Bạn xem các thành phần dưới đây

# Thành phần

Global constants macro-ui/global/global.constant.ts
