function customFetch(url, options = {}) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(options.method || "GET", url);
  
      // Set headers if provided
      if (options.headers) {
        Object.keys(options.headers).forEach((key) => {
          xhr.setRequestHeader(key, options.headers[key]);
        });
      }
  
      // Handle response
      xhr.onload = () => {
        const response = {
          ok: xhr.status >= 200 && xhr.status < 300, // Check if status is successful
          status: xhr.status,
          statusText: xhr.statusText,
          json: () => Promise.resolve(JSON.parse(xhr.responseText)),
          text: () => Promise.resolve(xhr.responseText),
        };
  
        if (response.ok) {
          resolve(response);
        } else {
          reject(new Error(`HTTP error! Status: ${xhr.status}`));
        }
      };
  
      // Handle network errors
      xhr.onerror = () => {
        reject(new Error("Network error"));
      };
  
      // Send the request
      xhr.send(options.body || null);
    });
  }
  customFetch()