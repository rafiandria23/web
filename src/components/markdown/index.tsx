import { useState, useCallback } from 'react';
import type { Components } from 'react-markdown';
import type { PluggableList } from 'react-markdown/lib/react-markdown';
import Image from 'next/image';
import {
  useTheme,
  Box,
  Link,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from '@mui/material';
import {
  ContentCopyOutlined as ContentCopyOutlinedIcon,
  ContentPasteOutlined as ContentPasteOutlinedIcon,
} from '@mui/icons-material';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// Languages
import c from 'react-syntax-highlighter/dist/cjs/languages/prism/c';
import csharp from 'react-syntax-highlighter/dist/cjs/languages/prism/csharp';
import cpp from 'react-syntax-highlighter/dist/cjs/languages/prism/cpp';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import diff from 'react-syntax-highlighter/dist/cjs/languages/prism/diff';
import markup from 'react-syntax-highlighter/dist/cjs/languages/prism/markup';
import java from 'react-syntax-highlighter/dist/cjs/languages/prism/java';
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import php from 'react-syntax-highlighter/dist/cjs/languages/prism/php';
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python';
import ruby from 'react-syntax-highlighter/dist/cjs/languages/prism/ruby';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';

// Themes
import oneDark from 'react-syntax-highlighter/dist/cjs/styles/prism/one-dark';

// remark Plugins
import remarkGFM from 'remark-gfm';

// rehype Plugins
import rehypeRaw from 'rehype-raw';

// Register Languages
SyntaxHighlighter.registerLanguage('c', c);
SyntaxHighlighter.registerLanguage('c#', csharp);
SyntaxHighlighter.registerLanguage('c++', cpp);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('diff', diff);
SyntaxHighlighter.registerLanguage('html', markup);
SyntaxHighlighter.registerLanguage('java', java);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('php', php);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('ruby', ruby);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('xml', markup);

const MarkdownImg: Components['img'] = ({ src, alt }) => {
  const theme = useTheme();

  return (
    <Image
      src={src!}
      alt={alt!}
      width={0}
      height={0}
      sizes='100vw'
      style={{
        display: 'block',
        objectFit: 'contain',
        width: '100%',
        height: 'auto',
        borderRadius: theme.shape.borderRadius,
      }}
    />
  );
};

const MarkdownLink: Components['a'] = ({ href, children }) => {
  return (
    <Link variant='body1' href={href} target='_blank'>
      {children}
    </Link>
  );
};

const MarkdownHeading1: Components['h1'] = ({ children }) => {
  return (
    <Typography variant='h1' component='h1' gutterBottom>
      {children}
    </Typography>
  );
};

const MarkdownHeading2: Components['h2'] = ({ children }) => {
  return (
    <Typography variant='h2' component='h2' gutterBottom>
      {children}
    </Typography>
  );
};

const MarkdownHeading3: Components['h3'] = ({ children }) => {
  return (
    <Typography variant='h3' component='h3' gutterBottom>
      {children}
    </Typography>
  );
};

const MarkdownHeading4: Components['h4'] = ({ children }) => {
  return (
    <Typography variant='h4' component='h4' gutterBottom>
      {children}
    </Typography>
  );
};

const MarkdownHeading5: Components['h5'] = ({ children }) => {
  return (
    <Typography variant='h5' component='h5' gutterBottom>
      {children}
    </Typography>
  );
};

const MarkdownHeading6: Components['h6'] = ({ children }) => {
  return (
    <Typography variant='h6' component='h6' gutterBottom>
      {children}
    </Typography>
  );
};

const MarkdownParagraph: Components['p'] = ({ children }) => {
  return (
    <Typography variant='body1' component='p' paragraph>
      {children}
    </Typography>
  );
};

const MarkdownCaption: Components['caption'] = ({ children }) => {
  return (
    <Typography variant='caption' component='caption'>
      {children}
    </Typography>
  );
};

const MarkdownTable: Components['table'] = ({ children }) => {
  return (
    <TableContainer>
      <Table>{children}</Table>
    </TableContainer>
  );
};

const MarkdownTableHead: Components['th'] = ({ children }) => {
  return <TableHead>{children}</TableHead>;
};

const MarkdownTableBody: Components['tbody'] = ({ children }) => {
  return <TableBody>{children}</TableBody>;
};

const MarkdownTableRow: Components['tr'] = ({ children }) => {
  return <TableRow>{children}</TableRow>;
};

const MarkdownTableCell: Components['td'] = ({ children }) => {
  return (
    <TableCell>
      <Typography>{children}</Typography>
    </TableCell>
  );
};

const MarkdownCode: Components['code'] = ({ className, children }) => {
  const language = /language-(\w+)/.exec(className ?? '') ?? '';
  const theme = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }, [setCopied]);

  return (
    <Box
      sx={{
        position: 'relative',
        '& .linenumber': {
          fontStyle: 'normal !important',
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 1,
          p: theme.spacing(1),
        }}
      >
        <CopyToClipboard text={children as string}>
          <IconButton
            onClick={handleCopy}
            sx={{
              color: theme.palette.primary.contrastText,
            }}
          >
            {copied ? (
              <ContentPasteOutlinedIcon fontSize='small' />
            ) : (
              <ContentCopyOutlinedIcon fontSize='small' />
            )}
          </IconButton>
        </CopyToClipboard>
      </Box>

      <SyntaxHighlighter
        style={oneDark}
        language={language[1]}
        showLineNumbers
        showInlineLineNumbers
        wrapLines
        wrapLongLines
        customStyle={{
          fontSize: theme.typography.body1.fontSize,
          borderRadius: theme.shape.borderRadius,
        }}
        lineNumberStyle={{
          fontSize: theme.typography.body1.fontSize,
        }}
      >
        {children as string}
      </SyntaxHighlighter>
    </Box>
  );
};

export const components: Components = {
  img: MarkdownImg,
  a: MarkdownLink,
  h1: MarkdownHeading1,
  h2: MarkdownHeading2,
  h3: MarkdownHeading3,
  h4: MarkdownHeading4,
  h5: MarkdownHeading5,
  h6: MarkdownHeading6,
  p: MarkdownParagraph,
  caption: MarkdownCaption,
  table: MarkdownTable,
  th: MarkdownTableHead,
  tbody: MarkdownTableBody,
  tr: MarkdownTableRow,
  td: MarkdownTableCell,
  code: MarkdownCode,
};

export const remarkPlugins: PluggableList = [remarkGFM];

export const rehypePlugins: PluggableList = [rehypeRaw];
